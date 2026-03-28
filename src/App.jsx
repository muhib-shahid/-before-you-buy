import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail/GameDetail';
import Compare from './pages/Compare';
import Deals from './pages/Deals';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Community from './pages/Community';
import ForumCategory from './pages/ForumCategory';
import ForumThread from './pages/ForumThread';
import Guides from './pages/Guides';
import GuideForm from './pages/GuideForm';
import GuideDetail from './pages/GuideDetail';
import HardwareProfiles from './pages/HardwareProfiles';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Streams from './pages/Streams';
import Calendar from './pages/Calendar';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminGames from './pages/Admin/GamesManagement';
import AdminDeals from './pages/Admin/DealsManagement';
import AdminReports from './pages/Admin/Reports';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminGuides from './pages/Admin/GuidesManagement';
import AdminNews from './pages/Admin/NewsManagement';
import AdminStreams from './pages/Admin/StreamsManagement';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <ThemeProvider>
            <FilterProvider>
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/admin/guides" element={<ProtectedRoute adminOnly><AdminGuides /></ProtectedRoute>} />
                  <Route path="/admin/news" element={<ProtectedRoute adminOnly><AdminNews /></ProtectedRoute>} />
                  <Route path="/admin/streams" element={<ProtectedRoute adminOnly><AdminStreams /></ProtectedRoute>} />
                  <Route path="/guides/new" element={<ProtectedRoute><GuideForm /></ProtectedRoute>} />
                  <Route path="/guide/:id/edit" element={<ProtectedRoute><GuideForm /></ProtectedRoute>} />
                  <Route path="/" element={<Home />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/game/:slug" element={<GameDetail />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/news/:id" element={<NewsDetail />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/forum/category/:id" element={<ForumCategory />} />
                  <Route path="/forum/thread/:id" element={<ForumThread />} />
                  <Route path="/guides" element={<Guides />} />
                  <Route path="/guide/:id" element={<GuideDetail />} />
                  <Route path="/hardware-profiles" element={<HardwareProfiles />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                  <Route path="/streams" element={<Streams />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
                  <Route path="/admin/games" element={<ProtectedRoute adminOnly><AdminGames /></ProtectedRoute>} />
                  <Route path="/admin/deals" element={<ProtectedRoute adminOnly><AdminDeals /></ProtectedRoute>} />
                  <Route path="/admin/reports" element={<ProtectedRoute adminOnly><AdminReports /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </FilterProvider>
          </ThemeProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;