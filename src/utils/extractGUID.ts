export default function extractGuidsFromPath(path) {
    const guidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;
    const match = path.match(guidRegex);
    return match ? match : [];
}