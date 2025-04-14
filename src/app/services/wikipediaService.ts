// biomap\src\app\services\wikipediaService.ts


// A utility module for fetching data from the Wikipedia API.includes search, summaries, full content, categories, related links, and random article fetching. 


export async function searchWikipedia(query: string) {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${encodeURIComponent(
        query
      )}&origin=*`
    );
    const data = await response.json();
    return data.query.search; 
  }
  
  export async function getWikipediaSummary(title: string) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(
      title
    )}&format=json&origin=*`;
    const res = await fetch(url);
    const json = await res.json();
    const page = Object.values(json.query.pages)[0] as any;
    return page.extract;
  }
  


  export async function getPageContent(title: string) {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
      title
    )}&format=json&origin=*`;
    const res = await fetch(url);
    const json = await res.json();
    return json.parse.text['*'];
  }
  
  export async function getPageCategories(title: string) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=categories&titles=${encodeURIComponent(
      title
    )}&format=json&origin=*`;
    const res = await fetch(url);
    const json = await res.json();
    const page = Object.values(json.query.pages)[0] as any;
    return page.categories || [];
  }
  
  export async function getPageLinks(title: string) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=links&titles=${encodeURIComponent(
      title
    )}&format=json&origin=*`;
    const res = await fetch(url);
    const json = await res.json();
    const page = Object.values(json.query.pages)[0] as any;
    return page.links || [];
  }
  
  export async function getRandomArticles(count: number = 5) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=${count}&format=json&origin=*`;
    const res = await fetch(url);
    const json = await res.json();
    return json.query.random;
  }
  