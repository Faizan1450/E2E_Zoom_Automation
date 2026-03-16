/**
 * ClassPlus Batch Configuration
 * Maps Zoom meeting topics → ClassPlus course/folder IDs
 * 
 * URL pattern was: https://classplusapp.com/diy/courses/add/content/{folderId}?id={courseId}
 * Now we extract folderId and courseId directly for the API.
 */

const CLASSPLUS_URLS = {
    "java full stack with springboot": { folderId: 45873074, courseId: 775723 },
    "generative ai": { folderId: 45446445, courseId: 772963 },
    "atlas css": { folderId: 48519073, courseId: 777062 },
    "genwizard 2.0": { folderId: 48187987, courseId: 803031 },
    "typescript + react js (9th march)": { folderId: 47610411, courseId: 796695 },
    "sql (jfs online)": { folderId: 48485070, courseId: 775723 },
    "springboot project (25-feb)": { folderId: 48398073, courseId: 805891 },
    "front-end by paramjeet sir": { folderId: 47375905, courseId: 775723 },
    "sharma computer academy's personal meeting room": { folderId: 49248245, courseId: 814256 },
};

const CLASSPLUS_BATCHES = [
    "Java Full Stack with SpringBoot",
    "Generative AI",
    "Atlas CSS",
    "Genwizard 2.0",
    "TypeScript + React JS (9th March)",
    "SQL (JFS Online)",
    "SpringBoot Project (25-Feb)",
    "Front-end By Paramjeet Sir",
    "Sharma Computer Academy's Personal Meeting Room"
];

export { CLASSPLUS_URLS, CLASSPLUS_BATCHES };