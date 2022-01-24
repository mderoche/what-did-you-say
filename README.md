# What Did You Say

A work-in-progress to find better alternatives to "said."

The idea behind this project is to take speech and reduce it to a variety of tones. Through these tones,
we can begin to make connections between words that share the same intent.

"Said" is a crux with no contexual information. Swapping "said" out for something more flavorful will improve any piece.

**All words currently using randomly generated data.**

## Prerequisites

-   API key from https://dictionaryapi.com/
-   Node + NPM

## Setup

```
# install dependencies
npm i

# inject API key into .env
touch .env
echo 'dictionaryApiKey=[KEY]' >> .env

# start the frontend in one terminal
npm start

# start the api in another terminal
npm start api

# open the app
open https://localhost:4200
```

## UI Screenshots

See: `assets/screenshots/`

## Keyword Packs

A database of potential alternatives for "said" are ranked against tones provided through "keyword packs". Keyword packs are primarily arrays of simple keywords that could indicate tone of speech.

For example, the `volume` keyword pack contains keywords for `quietly`, `loudly`, ...

### Developing Keyword Packs

This system is designed in a way to support dynamic keyword packs. The eventual intention is to let users select which
keyword packs they'd like to use, rather than the current five static packs.

To "install" a new keyword pack, land a JSON file in: `apps/api/assets/keyword-packs/`

Use the following format: (TODO: JSON schema definition for these)

```
{
    "name": "somePack",
    "description": "Short description of the keyword pack (used in the UI)",
    "keywords": [
        { "name": "<keyword>", "description": "<description (used in UI)>" },
        ...
    ]
}
```

If the keywords are self-explanatory and don't need separate UI descriptions, `keywords` can be an array of strings:

```
{
    "name": "somePack",
    "description": "Short description of the keyword pack (used in the UI)",
    "keywords": [
        <keyword>
        ...
    ]
}
```

## Scorers and Ranking Synonyms

### Search Parameters

Search parameters are stored as an object where _each key represents a keyword pack_ and _each value represents a single selected keyword_ for that pack.

For example,

```
// search parameters
{
    "intent": "exclamatory"
    "attitude": "friendly"
    ...
}
```

These values are generated from the dropdowns on the left side of the UI.

### Tone Rankings

Each synonym in the dataset has a ranking of 1-5 for each keyword in each keyword pack; one collection of these
rankings is called a ToneRanking. A ToneRanking, in other words, is an object where each key is a keyword pack, which holds a
nested object where each keyword in that pack is rated from 1-5 depending on how relevant that keyword is to the synonym.

For example,

```
// ToneRanking for synonym "yell", while happy
{
    "intent": {
        "declarative": 0,
        "exclamatory": 5,
        ...
    },
    "attitude: {
        "friendly": 5,
        "hostile": 0
    }
}
```

**Synonyms can have multiple ToneRankings!** For example, you can "yell" at someone for doing something bad, or you can "yell" (as in cheer) when you win a hand of cards. Different usages of a synonym rank tones differently, and thus each synonym has an array of independent ToneRankings.

**All ToneRankings are randomly generated.** Until the work is done to classify a large list of "said"-alternatives, all of the ToneRanking data is random for development.

## Scorers

Scorers are plugin functions that combine ToneRankings and SearchParameters to score each synonym in the dataset on how relevant it is to the provided SearchParameters.

The most basic scorer is the AccumulationScorer, where each synonym is scored based on the aggregate total of keyword rankings.

### Develpoping a Scorer

```
// template for new Scorer
//     scores everything at 0

export async function someScorer(
    searchResults: SearchResult[],
    searchParams: SearchParams
): Promise<SearchResult[]> {
    return searchResults.map(sr => {
        return {
            ...sr,
            score: 0
        };
    });
}
```

Scorer functions take two parameters:

| Parameter                     | Use                                                      |
| ----------------------------- | -------------------------------------------------------- |
| searchResults: SearchResult[] | Incoming array of search results that need to be scored. |
| searchParams: SearchParams    | Search parameters to consider when scoring.              |

Should always return a Promise carrying the newly scored set of search results.

## Transforms

After scoring, Transforms are plugin functions that use those scores to transform each result with the context of all results. For example, the `PercentileTransform` adds a `percentile` key to each result, classifying each result into a 0-100 percentile when compared against the other scores in the result set.

### Developing a Transform

```
// template for new Transform
//     does nothing

export function someTransform(
    searchResult: SearchResult,
    searchResults: SearchResult[]
): SearchResult {
    returns searchResult;
}

```

A Transform takes a `searchResult`, all `searchResults`, and returns a `searchResult`.
