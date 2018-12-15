export default {
    getArticles: () => {
        return fetch("/api/articles"); 
    }
};