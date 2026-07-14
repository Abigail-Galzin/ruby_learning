import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { providerApi } from "../../api/providers";

const initialState = { name: "", email: "", phone: "", address: "" };

export default function ProviderForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [provider, setProvider] = useState(initialState);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (isEdit) providerApi.get(id).then(({ data }) => setProvider(data));
  }, [id, isEdit]);

  const handleChange = (e) => {
    setProvider((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await providerApi.update(id, provider);
      } else {
        await providerApi.create(provider);
      }
      navigate("/providers");
    } catch (err) {
      setErrors(Object.entries(err.response?.data || {}));
    }
  };

  return (
    <div>
      <h1>{isEdit ? "Edit provider" : "New provider"}</h1>

      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map(([field, msgs], i) => (
            <li key={i}>{field}: {Array.isArray(msgs) ? msgs.join(", ") : msgs}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input name="name" value={provider.name || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={provider.email || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Phone</label>
          <input name="phone" value={provider.phone || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Address</label>
          <input name="address" value={provider.address || ""} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
