import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { providerApi } from "../../api/providers";

export default function ProviderList() {
  const [providers, setProviders] = useState([]);

  const fetchProviders = async () => {
    const { data } = await providerApi.getAll();
    setProviders(data);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await providerApi.delete(id);
    setProviders((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1>Providers</h1>
      <Link to="/providers/new">New provider</Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id}>
              <td>{provider.name}</td>
              <td>{provider.email}</td>
              <td>{provider.phone}</td>
              <td><Link to={`/providers/${provider.id}`}>Show</Link></td>
              <td><Link to={`/providers/${provider.id}/edit`}>Edit</Link></td>
              <td><button onClick={() => handleDelete(provider.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
