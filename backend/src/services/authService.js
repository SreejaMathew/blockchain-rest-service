import PropertiesReader from "properties-reader";

const properties = PropertiesReader("users.properties");
const allProps = properties.getAllProperties(); // <-- returns a plain object

export function getUserByEmail(email) {
  for (const [key, value] of Object.entries(allProps)) {   // <-- iterate Object.entries
    if (key.endsWith(".email") && value === email) {
      const base = key.split(".")[0];
      return {
        email: value,
        password: allProps[`${base}.password`]
      };
    }
  }
  return null;
}
//curl -X POST "http://localhost:3000/login" -H "Content-Type: application/json" -d "{\"email\":\"user1@example.com\",\"password\":\"mypassword\"}"