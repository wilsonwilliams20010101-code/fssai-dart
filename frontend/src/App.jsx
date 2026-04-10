import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import TestList from "./pages/TestList";
import TestDetail from "./pages/TestDetail";
import Chatbot from "./pages/Chatbot";
import Awareness from "./pages/Awareness";

// Simple placeholder pages for nav links
const About = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">About DART</h1>
    <p className="text-gray-600">DART (Detect Adulteration with Rapid Test) is an official FSSAI initiative to empower citizens with simple food testing methods.</p>
  </div>
);
const Pledge = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Take the Pledge</h1>
    <p className="text-gray-600 mb-8">Join thousands of citizens committed to food safety.</p>
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-lg mx-auto text-left">
      <p className="text-gray-700 italic">"I pledge to be a responsible citizen and will always test food for adulteration. I will report any adulterated food to FSSAI and spread awareness in my community."</p>
    </div>
  </div>
);
const Adulterants = () => <Categories />;

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/adulterants" element={<Adulterants />} />
          <Route path="/category/:categoryId" element={<TestList />} />
          <Route path="/test/:testId" element={<TestDetail />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/pledge" element={<Pledge />} />
          <Route path="/awareness" element={<Awareness />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
