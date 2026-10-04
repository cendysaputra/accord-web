import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "./auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const { data } = await axiosClient.post("/api/users/login", form);
      localStorage.setItem("token", data.token);
      navigate("/profile");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth">
      <div className="auth-inner container">
        <div className="auth-box">
          <h1 className="auth-title">
            Login<span className="dot">.</span>
          </h1>
          <p className="auth-lead">Masuk untuk melihat halaman profil kamu.</p>

          <form className="auth-form" onSubmit={onSubmit}>
            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </label>

            <button className="auth-button" type="submit" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {msg && <p className="auth-msg">{msg}</p>}

          <p className="auth-foot">
            Belum punya akun? <Link to="/register">Daftar di sini</Link>
          </p>
        </div>
      </div>
    </section>
  );
}