import { getLinks } from "@/domains/links/links.service";
import { Link } from "@/domains/links/links.types";
import { cookies } from "next/headers";

async function getLinksData(accessToken: string | undefined) {
  if (!accessToken) {
    throw new Error("Authentication token not found.");
  }
  return await getLinks(accessToken);
}

export default async function LinksPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const links = await getLinksData(accessToken);

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Manage Links</h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link: Link) => (
                <tr key={link.id}>
                  <td>{link.title}</td>
                  <td>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      {link.url}
                    </a>
                  </td>
                  <td>{link.position}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">edit</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error: any) {
    return <div className="text-red-500">{error.message}</div>;
  }
}
