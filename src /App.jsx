import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Messages from './pages/Messages'
import AdminProfessionals from './pages/AdminProfessionals'
import AdminMessages from './pages/AdminMessages'
import ProfessionalForm from './pages/ProfessionalForm'

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/professional-form" element={<ProfessionalForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/professionals" element={<AdminProfessionals />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}
