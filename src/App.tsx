import { useCallback, useState, type ReactNode } from "react";
import { Layout } from "./components/Layout";
import { NavList, NavListItem } from "./components/NavList";
import { PanelProvider } from "./components/Panel/PanelProvider";
import { Topbar } from "./components/Topbar";
import { HomePage } from "./pages";

export const App = () => {
  const [CurrentPage, setCurrentPage] = useState<ReactNode>(<HomePage />);
  const openHome = useCallback(() => {
    setCurrentPage(<HomePage />);
  }, []);

  return (
    <PanelProvider>
      <Layout>
        <Topbar title="SceneForge" subtitle="Create Easy 3D Structure for Web">
          <NavList>
            <NavListItem onClick={openHome}>Home</NavListItem>
          </NavList>
        </Topbar>
        {CurrentPage}
      </Layout>
    </PanelProvider>
  );
}
