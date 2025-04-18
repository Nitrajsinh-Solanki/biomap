
// biomap\src\app\components\CompoundSearch.tsx


'use client';

import { useState } from 'react';

interface CompoundSearchProps {
  onCompoundSelect: (compound: any) => void;
}

export default function CompoundSearch({ onCompoundSelect }: CompoundSearchProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSearch = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // using pubchem api for required data
      const cidRes = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(input)}/cids/JSON`);
      
      if (!cidRes.ok) {
        throw new Error('Compound not found');
      }
      
      const cidData = await cidRes.json();
      
      if (!cidData.IdentifierList?.CID || cidData.IdentifierList.CID.length === 0) {
        throw new Error('Compound not found');
      }
      
      const cid = cidData.IdentifierList.CID[0];
      
      const compoundRes = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/MolecularFormula,MolecularWeight,IUPACName,InChIKey,CanonicalSMILES/JSON`
      );
      
      if (!compoundRes.ok) {
        throw new Error('Failed to fetch compound properties');
      }
      
      const compoundData = await compoundRes.json();
      
      const descRes = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/description/JSON`
      );
      
      let description = 'No description available';
      
      if (descRes.ok) {
        const descData = await descRes.json();
        if (descData.InformationList?.Information && descData.InformationList.Information.length > 0) {
          description = descData.InformationList.Information[0].Description || description;
        }
      }
      
      const compoundInfo = {
        cid,
        name: input,
        ...compoundData.PropertyTable.Properties[0],
        description,
        image2D: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG`,
        image3D: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_type=3d`
      };
      
      onCompoundSelect(compoundInfo);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching data');
      onCompoundSelect(null);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter chemical name (e.g., Aspirin, Caffeine, Glucose)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-gray-800 flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={loading || !input.trim()}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}
      
      <div className="text-sm text-gray-500">
        <p>Popular searches: Aspirin, Caffeine, Glucose, Paracetamol, Penicillin</p>
      </div>
    </div>
  );
}
