import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Messages from './pages/Messages'
import AdminDashboard from './pages/AdminDashboard'
import AdminProfessionals from './pages/AdminProfessionals'
import AdminMessages from './pages/AdminMessages'
import ProfessionalForm from './pages/ProfessionalForm'
import AdminLogin from './pages/AdminLogin'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/professionals" element={<AdminProfessionals />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/professional-form" element={<ProfessionalForm />} />
      </Routes>
      <Footer />
    </Router>
  )
}
