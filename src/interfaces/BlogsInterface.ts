export default interface BlogsInterface {
    loading?: boolean;
    blogs?: Array<{
        id: string;
        image: string;
        title: string;
        category?: { slug: string; name: string };
    }>;
}