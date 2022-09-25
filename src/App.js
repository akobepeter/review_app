import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Card from "./components/shared/Card";
import Header from "./components/Header";
import { FeedbackList } from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";

import "./App.css";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import Post from "./components/Post";
import Redirect from "./components/Redirect";
import { FeedbackProvider } from "./context/FeedbackContext";


function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />

        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                  <AboutIconLink />
                </>
              }
            ></Route>

            <Route path="/about" element={<AboutPage />} />

            <Route path="/post/:id/:name/:text" element={<Post />} />

            <Route path="/redirect/*" element={<Redirect />} />
          </Routes>
          <Card>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </Card>
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
