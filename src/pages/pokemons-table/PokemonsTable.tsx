import { useEffect, useState } from "react";

import GenericTable from "../../components/generic-components/table/Table";
import { GenericTabs } from "../../components/generic-components/tabs/Tabs";
import { SearchBar } from "../../components/generic-components/search-bar/SearchBar";
import { Sort } from "../../components/generic-components/sort/Sort";
import { Popup } from "../../components/generic-components/popup/Popup";

import { pokemonService } from "../../services/pokemon.service";
import { Pokemon, SortBy } from "../../data/types/pokemon";
import { CardsIcon, ListIcon } from "../../assets/svg/svg";

import { StyledPage } from "./styles";
import { CardView } from "../../components/card-view/CardView";

interface PokemonTableProps {
  title: string
  userId?: number
}

export function PokemonsTable({ title, userId }: PokemonTableProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState<Pokemon[]>([])
  const [totalRows, setTotalRows] = useState(0)
  const [loading, setLoading] = useState(false)
  const [filterBy, setFilterBy] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortBy | null>(null)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    loadPokemons()
  }, [page, rowsPerPage, filterBy, sortBy, userId])

  async function loadPokemons() {
    setLoading(true)
    try {
      const { rows, total } = await pokemonService.fetchPokemons(filterBy, sortBy, page, rowsPerPage, userId)
      setRows(rows)
      setTotalRows(total)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  function onSearch(searchTerm: string) {
    setFilterBy(searchTerm)
  }
  
  const tabs = [
    {
      label: 'List',
      content: <GenericTable columns={pokemonService.tableColumns} rows={rows} page={page} setPage={setPage}
      rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalRows={totalRows}
      loading={loading} setSelectedPokemon={setSelectedPokemon}>
      </GenericTable>,
      icon: <ListIcon />
    },
    {
      label: 'Cards',
      content: <CardView pokemons={rows} selectedPokemon={selectedPokemon}
      setSelectedPokemon={setSelectedPokemon} setRowsPerPage={setRowsPerPage}
      rowsPerPage={rowsPerPage} totalRows={totalRows}>
      </CardView>,
      icon: <CardsIcon />
    }
  ]
  
    function handleCardClick(tabIdx: number) {
      const pokemonsPerPage = tabs[tabIdx].label === 'List' ? 10 : 12
      setRowsPerPage(pokemonsPerPage)
      setPage(0)
    }
  
  return <StyledPage>
    <div className="main-container">
      <h1 className="main-header">{title}</h1>
      <div className="main-content">
        <SearchBar onChange={onSearch} placeholder="Search Pokemon" isFiltered={Boolean(filterBy)}></SearchBar>
        <GenericTabs tabs={tabs} handleTabClick={handleCardClick}></GenericTabs>
        <Sort options={pokemonService.sortOptions} setSortBy={setSortBy}></Sort>
      </div>
      <Popup selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon}></Popup>
    </div>
  </StyledPage>
}