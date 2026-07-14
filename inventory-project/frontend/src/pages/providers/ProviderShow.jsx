import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { providerApi } from "../../api/providers";

export default function ProviderShow() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    providerApi.get(id).then(({ data }) => setProvider(data));
  }, [id]);

  if (!provider) return <p>Loading...</p>;

  return (
    <div>
      <h1>{provider.name}</h1>
      <p><strong>Email:</strong> {provider.email}</p>
      <p><strong>Phone:</strong> {provider.phone}</p>
      <p><strong>Address:</strong> {provider.address}</p>

      <Link to={`/providers/${provider.id}/edit`}>Edit</Link> | <Link to="/providers">Back</Link>
    </div>
  );
}
