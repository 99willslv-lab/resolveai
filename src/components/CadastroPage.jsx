import CadastroPage from './components/CadastroPage'

// Dentro do return/JSX:
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/cadastro" element={<CadastroPage />} />
  <Route path="/admin" element={<Admin />} />
  {/* outras rotas */}
</Routes>
