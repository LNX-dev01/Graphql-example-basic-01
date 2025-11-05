import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql_base/typeDefs";
import { resolvers } from "./graphql_base/resolvers";
import { logBanner } from "./banner/bannerColor";


logBanner("💪😎 **Welcome Lanixsi**✅", "yellow");
async function startServer() {
  try {
    const server = new ApolloServer({
      resolvers,
      typeDefs,
    });
    const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
    logBanner(`🚀  Server ready at: ${url}/graphql`, "magenta");
  } catch (error: any) {
      logBanner(`💥 Server error: ${error.message}`, "red");
  }
}
startServer();
