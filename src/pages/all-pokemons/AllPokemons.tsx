import GenericTable from "../../components/generic-components/table/Table";
import { StyledPage } from "../styles";
import { pokemonService } from "../../services/pokemon.service";
import { useEffect, useState } from "react";
import { BasicPokemon } from "../../data/types/pokemon";

const columns = [
    { id: 'image', label: '' },
    { id: 'name', label: 'Pokemon name' },
    { id: 'id', label: 'ID' },
    { id: 'description', label: 'Description', maxWidth: 545 },
    { id: 'powerLevel', label: 'Power Level', minWidth: 120 },
    { id: 'hpLevel', label: 'HP level', minWidth: 120 },
]

export function AllPokemons() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<BasicPokemon[]>([]);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
  
    // console.log(rows)
  
    useEffect(() => {
      const loadData = async () => {
        setLoading(true);
        try {
          const { rows, total } = await pokemonService.fetchPokemons(page, rowsPerPage);
          setRows(rows);
          setTotalRows(total);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadData();
    }, [page, rowsPerPage]);

    return <StyledPage>
        
        <div className="main-container">
            <h1 className="main-header">All Pokemons</h1>
            <GenericTable columns={columns} rows={rows} page={page} setPage={setPage}
            rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalRows={totalRows} loading={loading}></GenericTable>
        </div>
    </StyledPage>
}