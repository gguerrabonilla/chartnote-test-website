import { mirrorHtml, mirrorMetadata } from "../lib/mirror";

export const metadata = mirrorMetadata("home", "/");

export default function HomePage() {
  return <div id="__nuxt" dangerouslySetInnerHTML={{ __html: mirrorHtml("home") }} />;
}
