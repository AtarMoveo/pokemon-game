import GenericTable from "../../components/generic-components/table/Table";
import { StyledPage } from "../styles";
import { pokemonService } from "../../services/pokemon.service";
import { useEffect, useState } from "react";
import { BasicPokemon, SortBy } from "../../data/types/pokemon";
import { SearchBar } from "../../components/generic-components/search-bar/SearchBar";
import { Sort } from "../../components/generic-components/sort/Sort";
import { GenericTabs } from "../../components/generic-components/tabs/Tabs";
import { CardsIcon, ListIcon } from "../../assets/svg/svg";

const columns = [
  { id: 'image', label: '', minWidth: 35 },
  { id: 'name', label: 'Pokemon name' },
  { id: 'id', label: 'ID', minWidth: 35 },
  { id: 'description', label: 'Description', maxWidth: 545 },
  { id: 'powerLevel', label: 'Power Level', minWidth: 120 },
  { id: 'hpLevel', label: 'HP level', minWidth: 120 },
]

export function AllPokemons() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState<BasicPokemon[]>([])
  const [totalRows, setTotalRows] = useState(0)
  const [loading, setLoading] = useState(false)
  const [filterBy, setFilterBy] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortBy | null>(null)

  useEffect(() => {
    loadPokemons()
  }, [page, rowsPerPage, filterBy, sortBy])

  async function loadPokemons() {
    setLoading(true)
    try {
      const { rows, total } = await pokemonService.fetchPokemons(filterBy, sortBy, page, rowsPerPage);
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
      content: <GenericTable columns={columns} rows={rows} page={page} setPage={setPage}
        rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalRows={totalRows}
        loading={loading}></GenericTable>,
      icon: <ListIcon />
    },
    { label: 'Cards', content: 'Cards', icon: <CardsIcon />, disabled: true }
  ]

  return <StyledPage>
    <div className="main-container">
      <h1 className="main-header">All Pokemons</h1>
      <div className="main-content">
        <SearchBar onChange={onSearch} placeholder="Search Pokemon" isFiltered={Boolean(filterBy)}></SearchBar>
        <GenericTabs tabs={tabs}></GenericTabs>
        <Sort options={pokemonService.sortOptions} setSortBy={setSortBy}></Sort>
      </div>
    </div>
  </StyledPage>
}