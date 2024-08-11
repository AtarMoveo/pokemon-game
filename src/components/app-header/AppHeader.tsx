import { NavLink } from "react-router-dom";
import { Button } from "../generic-components/button/Button";
import { StyledAppHeader, StyledNavLink } from "./styles";

export function AppHeader() {

    return <StyledAppHeader>
        <section className="header-content">
            <div className="logo-and-nav-container">
                <img src="/logo.png" alt="Pokemon-logo" />
                <nav>
                    <StyledNavLink to="/">
                        All Pokemons
                    </StyledNavLink>
                    <StyledNavLink to="/myPokemons">
                        My Pokemons
                    </StyledNavLink>
                </nav>
            </div>
            <NavLink to="/fight"> <Button type="primary" size="md">Start a Fight</Button></NavLink>
        </section>
    </StyledAppHeader>
}