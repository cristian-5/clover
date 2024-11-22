
Array.prototype.random = function() {
	const length = this.length;
	return length === 0 ? null : this[Math.floor(Math.random() * length)];
};
Array.prototype.interpose = function(separator) {
	return this.join(separator) + separator;
};
String.prototype.capitalized = function() {
	return this.replace(/(^|\.\s*)([a-z])/gm, (_, d, L) => d + L.toUpperCase());
};
Number.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
Boolean.random = (probability = 0.5) => Math.random() <= probability;

const dictionary = {
    nouns: [
        "lorem", "ipsum", "dolor", "amet", "vitae", "finibus", "tempus", "orci", 
        "pellentesque", "congue", "puella", "hortus", "senex", "aqua", "terra", 
        "caelum", "ignis", "mare", "fides", "gloria", "virtus", "vox", "lux"
    ],
    objects: [
        "librum", "nummis", "pilam", "ludum", "cibum", "vinum", "pecuniam", 
        "amicum", "domum", "urbem", "arcem", "naves", "silvam", "florem", 
        "sagittam", "gladium", "pontem", "fenestram", "scriptum", "scutum", 
        "vectem", "tabulam"
    ],
    verbs: [
        "est", "erat", "fuit", "fit", "vincit", "manet", "currit", "vivit", 
        "sedet", "videt", "audit", "amat", "scribit", "cantat", "ludit", 
        "cogitat", "capit", "ducit", "facit", "tenet", "ponit", "intrat", 
        "exspectat", "debet", "vocat"
    ],
    conjunctions: [
        "et", "sed", "aut", "nec", "vel", "ac", "atque", "nunc", "vis", "sic", 
        "ita", "sit", "cum", "dum", "post", "ante", "quam", "modo", "quia", 
        "quod", "ubi", "ut", "ne", "nam"
    ]
};

/// wraps a `string` in a random HTML tag defined by `tags` when not empty
/// + `word: string` - the word to wrap
/// + `tags: string[]` - list of HTML tags to choose from
/// + `chance: number` - probability of wrapping the word (default: 30%)
function _wrap(word, tags = [], chance = 0.30) {
	chance = Math.max(0, Math.min(1, chance));
	if (tags.length === 0 || Math.random() > (1 - chance)) return word;
	const tag = tags.random();
	return `<${tag}>${word}</${tag}>`;
}

/// generates a list of random words as `string[]`
/// + `count: number | [ min:number, max:number]`
function _words(count = 1) {
	if (Array.isArray(count)) count = Number.randomInt(...count);
	return Array.from({ length: count }, () => dictionary.nouns.random());
}

/// generates a full sentence of random words as `string[]`
/// + `words: number | [ min:number, max:number]`
function _sentence(words) {
	let sentence = [], conjunctions = Number.randomInt(0, 2); // 0...2
	sentence.push(dictionary.nouns.random());
	for (let i = 0; i < conjunctions; i++) {
		sentence.push(dictionary.conjunctions.random());
		sentence.push(dictionary.nouns.random());
	}
	sentence.push(dictionary.verbs.random());
	if (Boolean.random()) {
		sentence.push(dictionary.nouns.random());
		for (let i = 0; i < conjunctions; i++) {
			sentence.push(dictionary.conjunctions.random());
			sentence.push(dictionary.objects.random());
		}
	}
	if (Array.isArray(words)) words = Number.randomInt(...words);
	sentence = sentence.slice(0, words);
	while (sentence.length < words) sentence.push(dictionary.nouns.random());
	return sentence;
}

/// generates a number of random sentences as `string[][]`
function _sentences(count = 1, words) {
	if (Array.isArray(count)) count = Number.randomInt(...count);
	return Array.from({ length: count }, () => _sentence(words));
}

/// generates a paragraph of random sentences as `string`
/// + `sentences: number | [ min:number, max:number]`
/// + `words: number | [ min:number, max:number]`
/// + `tags: string[]` - list of HTML tags to choose from
/// + `chance: number` - probability of wrapping the word (default: 30%)
function _paragraph(sentences = 3, words, tags, chance) {
	return _sentences(sentences, words).map(
		s => s.map(w => _wrap(w, tags, chance)).join(" ")
	).interpose(". ").trim().capitalized();
}

function _paragraphs(count = 1, html = false, sentences, words, tags, chance) {
	if (Array.isArray(count)) count = Number.randomInt(...count);
	const P = Array.from(
		{ length: count }, () => _paragraph(sentences, words, tags, chance)
	);
	return html ? P.map(p => `<p>${p}</p>`).join("\n") : P.join("\n\n");
}

export function lorem(options = { paragraphs: 1 }) {

	const { paragraphs, sentences, words, tags, chance, html } = options;

	if (!paragraphs) return _paragraph(sentences, words, tags, chance);
	return _paragraphs(paragraphs, html, sentences, words, tags, chance);

};
