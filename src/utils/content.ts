import slugify from "slugify";

export type ContentStructureItem = {
	label: string;
	path: string;
	children: ContentStructureItem[];
	isPage: boolean;
};

export function getActivePathFromUrlParam(path: string | string[]) {
	return Array.isArray(path) ? path.join("/") : path || "";
}

export function slugifyHeadline(headline: string) {
	return slugify(headline, {
		lower: true,
		replacement: "-",
		trim: true,
		strict: true,
		remove: /[*+~.()'"!:@]/g,
	});
}
