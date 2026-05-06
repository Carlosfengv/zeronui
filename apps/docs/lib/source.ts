import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { docs } from "../.source/server";

export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  icon(icon: string | undefined) {
    if (!icon || !(icon in icons)) {
      return;
    }

    return createElement(icons[icon as keyof typeof icons]);
  },
});
