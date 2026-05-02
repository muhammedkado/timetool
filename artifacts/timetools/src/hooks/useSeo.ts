import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  jsonLd?: object;
}

function setMetaContent(selector: string, attrName: string, attrValue: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta") as HTMLMetaElement;
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkHref(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link") as HTMLLinkElement;
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo({ title, description, canonical, keywords, ogImage, ogUrl, jsonLd }: SeoOptions) {
  useEffect(() => {
    document.title = title;

    setMetaContent('meta[name="description"]', "name", "description", description);
    setMetaContent('meta[property="og:title"]', "property", "og:title", title);
    setMetaContent('meta[property="og:description"]', "property", "og:description", description);
    setMetaContent('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMetaContent('meta[name="twitter:description"]', "name", "twitter:description", description);

    if (keywords) {
      setMetaContent('meta[name="keywords"]', "name", "keywords", keywords);
    }

    if (ogImage) {
      setMetaContent('meta[property="og:image"]', "property", "og:image", ogImage);
      setMetaContent('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
    }

    if (ogUrl) {
      setMetaContent('meta[property="og:url"]', "property", "og:url", ogUrl);
    }

    if (canonical) {
      setLinkHref("canonical", canonical);
    }

    if (jsonLd) {
      const scriptId = "page-jsonld";
      let script = document.getElementById(scriptId);
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.id = scriptId;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      if (jsonLd) {
        const script = document.getElementById("page-jsonld");
        if (script) script.remove();
      }
    };
  }, [title, description, canonical, keywords, ogImage, ogUrl, jsonLd]);
}
