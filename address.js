import * as itStreetAddressAi from "./it-street-address-ai.js";

/**
 * Compare two address objects and identify differences
 * @param {Object} address1 - First address object
 * @param {Object} address2 - Second address object
 * @returns {Object} Comparison results with differences and match percentage
 */
export function compareAddresses(address1, address2) {
  // Validate input objects
  const requiredFields = [
    'administrative_region',
    'administrative_area',
    'city',
    'postal_code',
    'street',
    'street_number',
    'internal_details'
  ];

  if (!address1 || !address2) {
    throw new Error('Both address objects are required');
  }

  for (const field of requiredFields) {
    if (!address1.hasOwnProperty(field) || !address2.hasOwnProperty(field)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Compare addresses
  const differences = {};
  for (const field of requiredFields) {
    if (field === 'street' && address1[field] !== address2[field]) {
      // Use it-street-address-ai module for street comparison
      try {
        const streetComparisonResult = itStreetAddressAi.compareAddresses(
          address1[field],
          address2[field]
        );
        
        if (streetComparisonResult.match) {
          // Streets are considered matching according to AI
          continue;
        } else {
          differences[field] = {
            address1: address1[field],
            address2: address2[field],
            aiComparison: streetComparisonResult
          };
        }
      } catch (error) {
        console.error("Error using it-street-address-ai:", error);
        // Fallback to standard comparison if AI comparison fails
        differences[field] = {
          address1: address1[field],
          address2: address2[field],
          aiComparisonError: error.message
        };
      }
    } else if (field === 'internal_details' && address1[field] !== address2[field]) {
      // Simple intelligence for internal_details
      const normalizeInternalDetails = (text) => {
        return text.toLowerCase()
          .replace(/interno/i, 'int')
          .replace(/int(\.)?/i, 'int')
          .replace(/\s+/g, ' ')
          .trim();
      };
      
      const normalized1 = normalizeInternalDetails(address1[field]);
      const normalized2 = normalizeInternalDetails(address2[field]);
      
      if (normalized1 === normalized2) {
        // Internal details are considered matching after normalization
        continue;
      } else {
        differences[field] = {
          address1: address1[field],
          address2: address2[field],
          normalized1: normalized1,
          normalized2: normalized2
        };
      }
    } else if (address1[field] !== address2[field]) {
      differences[field] = {
        address1: address1[field],
        address2: address2[field]
      };
    }
  }

  // Calculate match percentage
  const matchedFields = requiredFields.length - Object.keys(differences).length;
  const matchPercentage = (matchedFields / requiredFields.length) * 100;

  return {
    matches: Object.keys(differences).length === 0,
    matchPercentage: matchPercentage,
    differences: differences
  };
}