// Import libraries (remember to install them with: npm install levenshtein string-similarity)
import Levenshtein from "levenshtein";
import { compareTwoStrings as jaroWinklerSimilarity } from "string-similarity";

// Extended Dictionary of Abbreviations and Synonyms
const abbreviationMap = {
  via: "v.",
  piazza: "p.zza",
  piazzale: "p.le",
  corso: "c.so",
  strada: "str.",
  viale: "v.le",
  vicolo: "v.c.",
  stradale: "str.le",
  stradella: "str.della",
  traversa: "trav.",
  don: "d.",
  santo: "s.",
  santa: "s.",
  "santa maria": "s. m.",
  "santa maria del": "s. m. del",
  "santa maria d": "s. m. d",
  "santa maria di": "s. m. di",
  "santa maria dom": "s. m. dom",
  "santa maria domo": "s. m. domo",
  "santa maria domina": "s. m. domina",
  "santa maria domini": "s. m. domini",
  "santa maria domini": "s. m. domini",
  santissimo: "ss.mo",
  santissima: "ss.ma",
  largo: "l.",
  lungomare: "l.mare",
  "strada statale": ["str. stat.", "s.s."], // Multiple abbreviations
  "strada provinciale": ["str. prov.", "s.p."], // Multiple abbreviations
  "scala": "sc.",
  "interno": "int.",
  "appartamento": "app.",
  "condominio": "cond.",
};

// Function to normalize the address: removes punctuation, extra spaces, applies abbreviations
function normalizeAddress(address) {
  let normalized = address
    .toLowerCase()
    .trim()
    .replace(/[.,]/g, "") // Removes punctuation
    .replace(/\s+/g, " "); // Removes extra spaces

  // Replaces synonyms with standard abbreviations
  for (const [key, value] of Object.entries(abbreviationMap)) {
    const regex = new RegExp(`\\b${key}\\b`, "g");

    // Handle both single string and array of abbreviations
    if (Array.isArray(value)) {
      // For multiple abbreviations, we'll use the first one as the standard
      normalized = normalized.replace(regex, value[0]);

      // Also check if any of the alternative abbreviations are in the address
      for (let i = 0; i < value.length; i++) {
        const altRegex = new RegExp(
          `\\b${value[i].replace(/[.,]/g, "")}\\b`,
          "g"
        );
        if (altRegex.test(normalized)) {
          // If found, standardize to the first abbreviation
          normalized = normalized.replace(altRegex, value[0]);
        }
      }
    } else {
      normalized = normalized.replace(regex, value);
    }
  }
  return normalized;
}

// Similarity Algorithm with Levenshtein
function levenshteinSimilarity(str1, str2) {
  const levDistance = new Levenshtein(str1, str2).distance;
  return 1 - levDistance / Math.max(str1.length, str2.length);
}

// Function to extract token initials from an address
function getTokenInitials(address) {
  // Split the address into tokens (words)
  const tokens = address
    .toLowerCase()
    .trim()
    .replace(/[.,]/g, "")
    .split(/\s+/)
    .filter((token) => token.length > 0);

  // Extract the first character of each token
  return tokens.map((token) => token[0]).join("");
}

// Function to calculate token initials similarity
function tokenInitialsSimilarity(address1, address2) {
  const initials1 = getTokenInitials(address1);
  const initials2 = getTokenInitials(address2);

  // Use Levenshtein to compare the initials sequences
  const levDistance = new Levenshtein(initials1, initials2).distance;
  return 1 - levDistance / Math.max(initials1.length, initials2.length);
}

// Combined function to verify address similarity using a weighted approach
function combinedAddressSimilarity(
  address1,
  address2,
  weights = { jaro: 0.5, levenshtein: 0.3, initials: 0.2 },
  threshold = 0.7
) {
  const normAddr1 = normalizeAddress(address1);
  const normAddr2 = normalizeAddress(address2);

  const levenshteinScore = levenshteinSimilarity(normAddr1, normAddr2);
  const jaroWinklerScore = jaroWinklerSimilarity(normAddr1, normAddr2);
  const initialsScore = tokenInitialsSimilarity(address1, address2);

  // Weighted calculation using provided weights
  const weightedScore =
    jaroWinklerScore * weights.jaro +
    levenshteinScore * weights.levenshtein +
    initialsScore * weights.initials;

  return weightedScore >= threshold; // Use provided threshold
}

// Training function to find optimal weights and threshold
export function trainAddressMatcher(trainingData) {
  // trainingData should be an array of objects:
  // [{ address1: "...", address2: "...", shouldMatch: true/false }, ...]

  let bestAccuracy = 0;
  let bestWeights = { jaro: 0.5, levenshtein: 0.3, initials: 0.2 };
  let bestThreshold = 0.7;

  // Try different weight combinations
  for (let jaroWeight = 0.3; jaroWeight <= 0.7; jaroWeight += 0.1) {
    for (let levWeight = 0.2; levWeight <= 0.5; levWeight += 0.1) {
      // Ensure weights sum to 1
      const initialsWeight = 1 - jaroWeight - levWeight;
      if (initialsWeight <= 0) continue;

      // Try different thresholds
      for (let threshold = 0.5; threshold <= 0.9; threshold += 0.05) {
        const weights = {
          jaro: jaroWeight,
          levenshtein: levWeight,
          initials: initialsWeight,
        };
        let correctPredictions = 0;

        // Test current configuration on training data
        for (const example of trainingData) {
          const prediction = combinedAddressSimilarity(
            example.address1,
            example.address2,
            weights,
            threshold
          );

          if (prediction === example.shouldMatch) {
            correctPredictions++;
          }
        }

        const accuracy = correctPredictions / trainingData.length;

        // Update best configuration if current is better
        if (accuracy > bestAccuracy) {
          bestAccuracy = accuracy;
          bestWeights = weights;
          bestThreshold = threshold;
        }
      }
    }
  }

  console.log(`Training complete. Best accuracy: ${bestAccuracy.toFixed(2)}`);
  console.log(
    `Optimal weights: Jaro-Winkler ${bestWeights.jaro.toFixed(
      2
    )}, Levenshtein ${bestWeights.levenshtein.toFixed(
      2
    )}, Initials ${bestWeights.initials.toFixed(2)}`
  );
  console.log(`Optimal threshold: ${bestThreshold.toFixed(2)}`);

  return {
    weights: bestWeights,
    threshold: bestThreshold,
    accuracy: bestAccuracy,
  };
}

// Example of using the training function
export function trainingExample() {
  const rawTrainingData = [
    { address1: "Via Roma, ", address2: "v. Roma ", shouldMatch: true },
    { address1: "Viale Roma, ", address2: "v.le Roma ", shouldMatch: true },
    { address1: "Viale Roma, ", address2: "v. Roma ", shouldMatch: false },
    { address1: "Via Roma, ", address2: "v.le Roma ", shouldMatch: false },
    {
      address1: "Piazzale Italia ",
      address2: "p.le Italia ",
      shouldMatch: true,
    },
    {
      address1: "Via Garibaldi ",
      address2: "Via Mazzini ",
      shouldMatch: false,
    },
    {
      address1: "Corso Vittorio Emanuele ",
      address2: "c.so Vittorio Emanuele ",
      shouldMatch: true,
    },
    { address1: "Via Roma ", address2: "Via Roma ", shouldMatch: false },
    {
      address1: "Strada del Mare ",
      address2: "str. del Mare ",
      shouldMatch: true,
    },
    {
      address1: "Viale Giuseppe Verdi ",
      address2: "v.le G. Verdi ",
      shouldMatch: true,
    },
    {
      address1: "Viale Giuseppe Verdi ",
      address2: "v.le Verdi ",
      shouldMatch: true,
    },
    {
      address1: "Traversa del Mare ",
      address2: "trav. del Mare ",
      shouldMatch: true,
    },
    {
      address1: "Via Don Morosini ",
      address2: "Via Don Giuseppe Morosini ",
      shouldMatch: true,
    },
    {
      address1: "Via Don Morosini ",
      address2: "Via Don Salvatore Morosini ",
      shouldMatch: true,
    },
    {
      address1: "Via Don Giuseppe Morosini ",
      address2: "Via Don Salvatore Morosini ",
      shouldMatch: false,
    },
    {
      address1: "Piazza Garibaldi",
      address2: "p.zza Garibaldi",
      shouldMatch: true,
    },
    { address1: "Piazzale Italia", address2: "p.le Italia", shouldMatch: true },
    {
      address1: "Corso Vittorio Emanuele",
      address2: "c.so Vittorio Emanuele",
      shouldMatch: true,
    },
    {
      address1: "Strada del Mare",
      address2: "str. del Mare",
      shouldMatch: true,
    },
    {
      address1: "Viale Giuseppe Verdi",
      address2: "v.le G. Verdi",
      shouldMatch: true,
    },
    {
      address1: "Viale Giuseppe Verdi",
      address2: "v.le Verdi",
      shouldMatch: true,
    },
    {
      address1: "Traversa del Mare",
      address2: "trav. del Mare",
      shouldMatch: true,
    },
    {
      address1: "Via Don Morosini",
      address2: "Via Don Giuseppe Morosini",
      shouldMatch: true,
    },
    {
      address1: "Via Don Morosini",
      address2: "Via Don Salvatore Morosini",
      shouldMatch: true,
    },
    {
      address1: "Via Don Giuseppe Morosini",
      address2: "Via Don Salvatore Morosini",
      shouldMatch: false,
    },
    { address1: "Largo Manzoni", address2: "l. Manzoni", shouldMatch: true },
    {
      address1: "Lungomare Colombo",
      address2: "l.mare Colombo",
      shouldMatch: true,
    },
    {
      address1: "Strada Statale 1",
      address2: "str. stat. 1",
      shouldMatch: true,
    },
    { address1: "Strada Statale 1", address2: "s.s. 1", shouldMatch: true },
    {
      address1: "Strada Provinciale 45",
      address2: "str. prov. 45",
      shouldMatch: true,
    },
    {
      address1: "Santa Maria del Fiore",
      address2: "s. m. del Fiore",
      shouldMatch: true,
    },
    {
      address1: "Santa Maria di Loreto",
      address2: "s. m. di Loreto",
      shouldMatch: true,
    },
    {
      address1: "Santa Maria Domina",
      address2: "s. m. domina",
      shouldMatch: true,
    },
    {
      address1: "Santissimo Redentore",
      address2: "ss.mo Redentore",
      shouldMatch: true,
    },
    {
      address1: "Santissima Annunziata",
      address2: "ss.ma Annunziata",
      shouldMatch: true,
    },

    { address1: "Via Roma", address2: "Viale Roma", shouldMatch: false },
    {
      address1: "Piazza Garibaldi",
      address2: "Piazzale Garibaldi",
      shouldMatch: false,
    },
    {
      address1: "Largo Manzoni",
      address2: "Piazza Manzoni",
      shouldMatch: false,
    },
    {
      address1: "Via Don Morosini",
      address2: "Viale Don Morosini",
      shouldMatch: false,
    },
    {
      address1: "Santa Maria di Loreto",
      address2: "Santissima Loreto",
      shouldMatch: false,
    },
    {
      address1: "Strada Statale 1",
      address2: "Strada Provinciale 1",
      shouldMatch: false,
    },
    {
      address1: "Corso Vittorio Emanuele",
      address2: "Viale Vittorio Emanuele",
      shouldMatch: false,
    },
    { address1: "Via Roma", address2: "v. Roma", "shouldMatch": true },
    { address1: "Piazza Garibaldi", address2: "p.zza Garibaldi", "shouldMatch": true },
    { address1: "Piazzale Italia", address2: "p.le Italia", "shouldMatch": true },
    { address1: "Corso Vittorio Emanuele", address2: "c.so Vittorio Emanuele", "shouldMatch": true },
    { address1: "Strada del Mare", address2: "str. del Mare", "shouldMatch": true },
    { address1: "Viale Giuseppe Verdi", address2: "v.le G. Verdi", "shouldMatch": true },
    { address1: "Viale Giuseppe Verdi", address2: "v.le Verdi", "shouldMatch": true },
    { address1: "Traversa del Mare", address2: "trav. del Mare", "shouldMatch": true },
    { address1: "Via Don Morosini", address2: "Via Don Giuseppe Morosini", "shouldMatch": true },
    { address1: "Via Don Morosini", address2: "Via Don Salvatore Morosini", "shouldMatch": true },
    { address1: "Via Don Giuseppe Morosini", address2: "Via Don Salvatore Morosini", "shouldMatch": false },
    { address1: "Largo Manzoni", address2: "l. Manzoni", "shouldMatch": true },
    { address1: "Lungomare Colombo", address2: "l.mare Colombo", "shouldMatch": true },
    { address1: "Strada Statale 1", address2: "str. stat. 1", "shouldMatch": true },
    { address1: "Strada Statale 1", address2: "s.s. 1", "shouldMatch": true },
    { address1: "Strada Provinciale 45", address2: "str. prov. 45", "shouldMatch": true },
    { address1: "Santa Maria del Fiore", address2: "s. m. del Fiore", "shouldMatch": true },
    { address1: "Santa Maria di Loreto", address2: "s. m. di Loreto", "shouldMatch": true },
    { address1: "Santa Maria Domina", address2: "s. m. domina", "shouldMatch": true },
    { address1: "Santissimo Redentore", address2: "ss.mo Redentore", "shouldMatch": true },
    { address1: "Santissima Annunziata", address2: "ss.ma Annunziata", "shouldMatch": true },
    { address1: "Stradale del Sole", address2: "str.le del Sole", "shouldMatch": true },
    { address1: "Stradella Fiorita", address2: "str.della Fiorita", "shouldMatch": true },
    { address1: "Vicolo Corto", address2: "v.c. Corto", "shouldMatch": true },
    { address1: "Viale della Libertà", address2: "v.le della Libertà", "shouldMatch": true },
    { address1: "Piazza Duomo", address2: "p.zza Duomo", "shouldMatch": true },
    { address1: "Santa Maria Domini", address2: "s. m. domini", "shouldMatch": true },
    { address1: "Santa Maria Domo", address2: "s. m. domo", "shouldMatch": true },
    
    { address1: "Via Roma", address2: "Viale Roma", "shouldMatch": false },
    { address1: "Piazza Garibaldi", address2: "Piazzale Garibaldi", "shouldMatch": false },
    { address1: "Largo Manzoni", address2: "Piazza Manzoni", "shouldMatch": false },
    { address1: "Via Don Morosini", address2: "Viale Don Morosini", "shouldMatch": false },
    { address1: "Santa Maria di Loreto", address2: "Santissima Loreto", "shouldMatch": false },
    { address1: "Strada Statale 1", address2: "Strada Provinciale 1", "shouldMatch": false },
    { address1: "Corso Vittorio Emanuele", address2: "Viale Vittorio Emanuele", "shouldMatch": false },
    { address1: "Strada del Sole", address2: "Stradella del Sole", "shouldMatch": false },
    { address1: "Vicolo Corto", address2: "Via Corto", "shouldMatch": false },
    { address1: "Lungomare Colombo", address2: "Viale Colombo", "shouldMatch": false }

  ];

  // Remove duplicate objects from training data
  const trainingData = Array.from(
    new Map(
      rawTrainingData.map(item => 
        [JSON.stringify(item), item]
      )
    ).values()
  );
  
  console.log(`Training with ${trainingData.length} unique examples (removed ${rawTrainingData.length - trainingData.length} duplicates)`);

  const trainedParams = trainAddressMatcher(trainingData);

  // Test the trained model
  console.log("\nTesting with trained parameters:");
  const testAddress1 = "Viale Giuseppe Verdi ";
  const testAddress2 = "v.le G. Verdi ";
  console.log(
    `Comparison between '${testAddress1}' and '${testAddress2}':`,
    combinedAddressSimilarity(
      testAddress1,
      testAddress2,
      trainedParams.weights,
      trainedParams.threshold
    )
      ? "Match!"
      : "No Match!"
  );
}

// Function to demonstrate address comparison examples
export function example() {
  const address1 = "Via Roma, ";
  const address2 = "v. Roma ";
  const address3 = "Piazzale Italia ";
  const address4 = "p.le Italia ";

  console.log(
    `Comparison between '${address1}' and '${address2}':`,
    combinedAddressSimilarity(address1, address2) ? "Match!" : "No Match!"
  );

  console.log(
    `Comparison between '${address3}' and '${address4}':`,
    combinedAddressSimilarity(address3, address4) ? "Match!" : "No Match!"
  );
}

// Command line function to compare two addresses
export function compareAddresses(address1, address2) {
  if (!address1 || !address2) {
    console.log("Error: Please provide two addresses to compare");
    console.log("Usage: node it-street-address-ai.js \"Via Roma, 1\" \"v. Roma 1\"");
    return;
  }

  const result = combinedAddressSimilarity(address1, address2);
  
  console.log("\n=== Italian Street Address Comparison ===");
  console.log(`Address 1: "${address1}"`);
  console.log(`Address 2: "${address2}"`);
  console.log(`Normalized 1: "${normalizeAddress(address1)}"`);
  console.log(`Normalized 2: "${normalizeAddress(address2)}"`);
  console.log(`Result: ${result ? "MATCH ✓" : "NO MATCH ✗"}`);
  
  // Show detailed scores for transparency
  const normAddr1 = normalizeAddress(address1);
  const normAddr2 = normalizeAddress(address2);
  const levenshteinScore = levenshteinSimilarity(normAddr1, normAddr2);
  const jaroWinklerScore = jaroWinklerSimilarity(normAddr1, normAddr2);
  const initialsScore = tokenInitialsSimilarity(address1, address2);
  
  console.log("\nDetailed Scores:");
  console.log(`Levenshtein Similarity: ${levenshteinScore.toFixed(4)}`);
  console.log(`Jaro-Winkler Similarity: ${jaroWinklerScore.toFixed(4)}`);
  console.log(`Token Initials Similarity: ${initialsScore.toFixed(4)}`);

  // Return combined results
  return {
    match: result,
    scores: {
      levenshtein: levenshteinScore,
      jaroWinkler: jaroWinklerScore, 
      tokenInitials: initialsScore
    },
    normalized: {
      address1: normAddr1,
      address2: normAddr2
    }
  };
}

// Main function to handle command line arguments
if (typeof require !== 'undefined' && require.main === module) {
  const args = process.argv.slice(2);
  if (args.length >= 2) {
    compareAddresses(args[0], args[1]);
  } else {
    console.log("Error: Please provide two addresses to compare");
    console.log("Usage: node it-street-address-ai.js \"Via Roma, 1\" \"v. Roma 1\"");
  }
}

