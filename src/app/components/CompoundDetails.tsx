
// biomap\src\app\components\CompoundDetails.tsx
'use client';

interface CompoundDetailsProps {
  compound: any;
}

export default function CompoundDetails({ compound }: CompoundDetailsProps) {
  if (!compound) return null;
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/2">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{compound.IUPACName || compound.name}</h2>
        <p className="text-gray-600 mb-4">{compound.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-700">Molecular Formula</h3>
            <p className="text-lg text-gray-700">{compound.MolecularFormula}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-700">Molecular Weight</h3>
            <p className="text-lg text-gray-700">{parseFloat(compound.MolecularWeight).toFixed(2)} g/mol</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md col-span-1 md:col-span-2">
            <h3 className="font-semibold text-gray-700">SMILES Notation</h3>
            <p className="text-gray-700 text-sm font-mono break-all">{compound.CanonicalSMILES}</p>
          </div>
          
          {compound.InChIKey && (
            <div className="bg-gray-50 p-4 rounded-md col-span-1 md:col-span-2">
              <h3 className="font-semibold text-gray-700">InChI Key</h3>
              <p className="text-sm font-mono text-gray-700">{compound.InChIKey}</p>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">External Resources</h3>
          <div className="flex flex-wrap gap-2">
            <a 
              href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.cid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition"
            >
              PubChem
            </a>
            <a 
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(compound.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition"
            >
              Wikipedia
            </a>
          </div>
        </div>
      </div>
      
      <div className="lg:w-1/2">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4 flex justify-center">
            <img 
              src={compound.image2D}
              alt={`Chemical structure of ${compound.name}`}
              className="max-w-full h-auto max-h-80 object-contain"
            />
          </div>
          
          <div className="p-4 bg-gray-50 text-center text-sm text-gray-600">
            Chemical Structure
          </div>
        </div>
      </div>
    </div>
  );
}
