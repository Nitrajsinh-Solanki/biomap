// biomap\src\app\components\PeriodicTable.tsx


'use client';
import React from 'react';
import { useState } from 'react';

interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
  group: number;
  period: number;
  atomicWeight?: string;
}

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  
  const elements: Element[] = [
    // Period 1
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, category: 'nonmetal', group: 1, period: 1, atomicWeight: '1.008' },
    { symbol: 'He', name: 'Helium', atomicNumber: 2, category: 'noble-gas', group: 18, period: 1, atomicWeight: '4.0026' },
    
    // Period 2
    { symbol: 'Li', name: 'Lithium', atomicNumber: 3, category: 'alkali-metal', group: 1, period: 2, atomicWeight: '6.94' },
    { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, category: 'alkaline-earth', group: 2, period: 2, atomicWeight: '9.0122' },
    { symbol: 'B', name: 'Boron', atomicNumber: 5, category: 'metalloid', group: 13, period: 2, atomicWeight: '10.81' },
    { symbol: 'C', name: 'Carbon', atomicNumber: 6, category: 'nonmetal', group: 14, period: 2, atomicWeight: '12.011' },
    { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, category: 'nonmetal', group: 15, period: 2, atomicWeight: '14.007' },
    { symbol: 'O', name: 'Oxygen', atomicNumber: 8, category: 'nonmetal', group: 16, period: 2, atomicWeight: '15.999' },
    { symbol: 'F', name: 'Fluorine', atomicNumber: 9, category: 'halogen', group: 17, period: 2, atomicWeight: '18.998' },
    { symbol: 'Ne', name: 'Neon', atomicNumber: 10, category: 'noble-gas', group: 18, period: 2, atomicWeight: '20.180' },
    
    // Period 3
    { symbol: 'Na', name: 'Sodium', atomicNumber: 11, category: 'alkali-metal', group: 1, period: 3, atomicWeight: '22.990' },
    { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, category: 'alkaline-earth', group: 2, period: 3, atomicWeight: '24.305' },
    { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, category: 'post-transition', group: 13, period: 3, atomicWeight: '26.982' },
    { symbol: 'Si', name: 'Silicon', atomicNumber: 14, category: 'metalloid', group: 14, period: 3, atomicWeight: '28.085' },
    { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, category: 'nonmetal', group: 15, period: 3, atomicWeight: '30.974' },
    { symbol: 'S', name: 'Sulfur', atomicNumber: 16, category: 'nonmetal', group: 16, period: 3, atomicWeight: '32.06' },
    { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, category: 'halogen', group: 17, period: 3, atomicWeight: '35.45' },
    { symbol: 'Ar', name: 'Argon', atomicNumber: 18, category: 'noble-gas', group: 18, period: 3, atomicWeight: '39.948' },
    
    // Period 4
    { symbol: 'K', name: 'Potassium', atomicNumber: 19, category: 'alkali-metal', group: 1, period: 4, atomicWeight: '39.098' },
    { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, category: 'alkaline-earth', group: 2, period: 4, atomicWeight: '40.078' },
    { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, category: 'transition', group: 3, period: 4, atomicWeight: '44.956' },
    { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, category: 'transition', group: 4, period: 4, atomicWeight: '47.867' },
    { symbol: 'V', name: 'Vanadium', atomicNumber: 23, category: 'transition', group: 5, period: 4, atomicWeight: '50.942' },
    { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, category: 'transition', group: 6, period: 4, atomicWeight: '51.996' },
    { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, category: 'transition', group: 7, period: 4, atomicWeight: '54.938' },
    { symbol: 'Fe', name: 'Iron', atomicNumber: 26, category: 'transition', group: 8, period: 4, atomicWeight: '55.845' },
    { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, category: 'transition', group: 9, period: 4, atomicWeight: '58.933' },
    { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, category: 'transition', group: 10, period: 4, atomicWeight: '58.693' },
    { symbol: 'Cu', name: 'Copper', atomicNumber: 29, category: 'transition', group: 11, period: 4, atomicWeight: '63.546' },
    { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, category: 'transition', group: 12, period: 4, atomicWeight: '65.38' },
    { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, category: 'post-transition', group: 13, period: 4, atomicWeight: '69.723' },
    { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, category: 'metalloid', group: 14, period: 4, atomicWeight: '72.630' },
    { symbol: 'As', name: 'Arsenic', atomicNumber: 33, category: 'metalloid', group: 15, period: 4, atomicWeight: '74.922' },
    { symbol: 'Se', name: 'Selenium', atomicNumber: 34, category: 'nonmetal', group: 16, period: 4, atomicWeight: '78.971' },
    { symbol: 'Br', name: 'Bromine', atomicNumber: 35, category: 'halogen', group: 17, period: 4, atomicWeight: '79.904' },
    { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, category: 'noble-gas', group: 18, period: 4, atomicWeight: '83.798' },
    
    // Period 5
    { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, category: 'alkali-metal', group: 1, period: 5, atomicWeight: '85.468' },
    { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, category: 'alkaline-earth', group: 2, period: 5, atomicWeight: '87.62' },
    { symbol: 'Y', name: 'Yttrium', atomicNumber: 39, category: 'transition', group: 3, period: 5, atomicWeight: '88.906' },
    { symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, category: 'transition', group: 4, period: 5, atomicWeight: '91.224' },
    { symbol: 'Nb', name: 'Niobium', atomicNumber: 41, category: 'transition', group: 5, period: 5, atomicWeight: '92.906' },
    { symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, category: 'transition', group: 6, period: 5, atomicWeight: '95.95' },
    { symbol: 'Tc', name: 'Technetium', atomicNumber: 43, category: 'transition', group: 7, period: 5, atomicWeight: '98' },
    { symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, category: 'transition', group: 8, period: 5, atomicWeight: '101.07' },
    { symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, category: 'transition', group: 9, period: 5, atomicWeight: '102.91' },
    { symbol: 'Pd', name: 'Palladium', atomicNumber: 46, category: 'transition', group: 10, period: 5, atomicWeight: '106.42' },
    { symbol: 'Ag', name: 'Silver', atomicNumber: 47, category: 'transition', group: 11, period: 5, atomicWeight: '107.87' },
    { symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, category: 'transition', group: 12, period: 5, atomicWeight: '112.41' },
    { symbol: 'In', name: 'Indium', atomicNumber: 49, category: 'post-transition', group: 13, period: 5, atomicWeight: '114.82' },
    { symbol: 'Sn', name: 'Tin', atomicNumber: 50, category: 'post-transition', group: 14, period: 5, atomicWeight: '118.71' },
    { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, category: 'metalloid', group: 15, period: 5, atomicWeight: '121.76' },
    { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, category: 'metalloid', group: 16, period: 5, atomicWeight: '127.60' },
    { symbol: 'I', name: 'Iodine', atomicNumber: 53, category: 'halogen', group: 17, period: 5, atomicWeight: '126.90' },
    { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, category: 'noble-gas', group: 18, period: 5, atomicWeight: '131.29' },
    
    // Period 6
    { symbol: 'Cs', name: 'Cesium', atomicNumber: 55, category: 'alkali-metal', group: 1, period: 6, atomicWeight: '132.91' },
    { symbol: 'Ba', name: 'Barium', atomicNumber: 56, category: 'alkaline-earth', group: 2, period: 6, atomicWeight: '137.33' },
    { symbol: 'La', name: 'Lanthanum', atomicNumber: 57, category: 'lanthanide', group: 3, period: 6, atomicWeight: '138.91' },
    { symbol: 'Ce', name: 'Cerium', atomicNumber: 58, category: 'lanthanide', group: 3, period: 6, atomicWeight: '140.12' },
    { symbol: 'Pr', name: 'Praseodymium', atomicNumber: 59, category: 'lanthanide', group: 3, period: 6, atomicWeight: '140.91' },
    { symbol: 'Nd', name: 'Neodymium', atomicNumber: 60, category: 'lanthanide', group: 3, period: 6, atomicWeight: '144.24' },
    { symbol: 'Pm', name: 'Promethium', atomicNumber: 61, category: 'lanthanide', group: 3, period: 6, atomicWeight: '145' },
    { symbol: 'Sm', name: 'Samarium', atomicNumber: 62, category: 'lanthanide', group: 3, period: 6, atomicWeight: '150.36' },
    { symbol: 'Eu', name: 'Europium', atomicNumber: 63, category: 'lanthanide', group: 3, period: 6, atomicWeight: '151.96' },
    { symbol: 'Gd', name: 'Gadolinium', atomicNumber: 64, category: 'lanthanide', group: 3, period: 6, atomicWeight: '157.25' },
    { symbol: 'Tb', name: 'Terbium', atomicNumber: 65, category: 'lanthanide', group: 3, period: 6, atomicWeight: '158.93' },
    { symbol: 'Dy', name: 'Dysprosium', atomicNumber: 66, category: 'lanthanide', group: 3, period: 6, atomicWeight: '162.50' },
    { symbol: 'Ho', name: 'Holmium', atomicNumber: 67, category: 'lanthanide', group: 3, period: 6, atomicWeight: '164.93' },
    { symbol: 'Er', name: 'Erbium', atomicNumber: 68, category: 'lanthanide', group: 3, period: 6, atomicWeight: '167.26' },
    { symbol: 'Tm', name: 'Thulium', atomicNumber: 69, category: 'lanthanide', group: 3, period: 6, atomicWeight: '168.93' },
    { symbol: 'Yb', name: 'Ytterbium', atomicNumber: 70, category: 'lanthanide', group: 3, period: 6, atomicWeight: '173.05' },
    { symbol: 'Lu', name: 'Lutetium', atomicNumber: 71, category: 'lanthanide', group: 3, period: 6, atomicWeight: '174.97' },
    { symbol: 'Hf', name: 'Hafnium', atomicNumber: 72, category: 'transition', group: 4, period: 6, atomicWeight: '178.49' },
    { symbol: 'Ta', name: 'Tantalum', atomicNumber: 73, category: 'transition', group: 5, period: 6, atomicWeight: '180.95' },
    { symbol: 'W', name: 'Tungsten', atomicNumber: 74, category: 'transition', group: 6, period: 6, atomicWeight: '183.84' },
    { symbol: 'Re', name: 'Rhenium', atomicNumber: 75, category: 'transition', group: 7, period: 6, atomicWeight: '186.21' },
    { symbol: 'Os', name: 'Osmium', atomicNumber: 76, category: 'transition', group: 8, period: 6, atomicWeight: '190.23' },
    { symbol: 'Ir', name: 'Iridium', atomicNumber: 77, category: 'transition', group: 9, period: 6, atomicWeight: '192.22' },
    { symbol: 'Pt', name: 'Platinum', atomicNumber: 78, category: 'transition', group: 10, period: 6, atomicWeight: '195.08' },
    { symbol: 'Au', name: 'Gold', atomicNumber: 79, category: 'transition', group: 11, period: 6, atomicWeight: '196.97' },
    { symbol: 'Hg', name: 'Mercury', atomicNumber: 80, category: 'transition', group: 12, period: 6, atomicWeight: '200.59' },
    { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, category: 'post-transition', group: 13, period: 6, atomicWeight: '204.38' },
    { symbol: 'Pb', name: 'Lead', atomicNumber: 82, category: 'post-transition', group: 14, period: 6, atomicWeight: '207.2' },
    { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, category: 'post-transition', group: 15, period: 6, atomicWeight: '208.98' },
    { symbol: 'Po', name: 'Polonium', atomicNumber: 84, category: 'post-transition', group: 16, period: 6, atomicWeight: '209' },
    { symbol: 'At', name: 'Astatine', atomicNumber: 85, category: 'halogen', group: 17, period: 6, atomicWeight: '210' },
    { symbol: 'Rn', name: 'Radon', atomicNumber: 86, category: 'noble-gas', group: 18, period: 6, atomicWeight: '222' },
    
    // Period 7
    { symbol: 'Fr', name: 'Francium', atomicNumber: 87, category: 'alkali-metal', group: 1, period: 7, atomicWeight: '223' },
    { symbol: 'Ra', name: 'Radium', atomicNumber: 88, category: 'alkaline-earth', group: 2, period: 7, atomicWeight: '226' },
    { symbol: 'Ac', name: 'Actinium', atomicNumber: 89, category: 'actinide', group: 3, period: 7, atomicWeight: '227' },
    { symbol: 'Th', name: 'Thorium', atomicNumber: 90, category: 'actinide', group: 3, period: 7, atomicWeight: '232.04' },
    { symbol: 'Pa', name: 'Protactinium', atomicNumber: 91, category: 'actinide', group: 3, period: 7, atomicWeight: '231.04' },
    { symbol: 'U', name: 'Uranium', atomicNumber: 92, category: 'actinide', group: 3, period: 7, atomicWeight: '238.03' },
    { symbol: 'Np', name: 'Neptunium', atomicNumber: 93, category: 'actinide', group: 3, period: 7, atomicWeight: '237' },
    { symbol: 'Pu', name: 'Plutonium', atomicNumber: 94, category: 'actinide', group: 3, period: 7, atomicWeight: '244' },
    { symbol: 'Am', name: 'Americium', atomicNumber: 95, category: 'actinide', group: 3, period: 7, atomicWeight: '243' },
    { symbol: 'Cm', name: 'Curium', atomicNumber: 96, category: 'actinide', group: 3, period: 7, atomicWeight: '247' },
    { symbol: 'Bk', name: 'Berkelium', atomicNumber: 97, category: 'actinide', group: 3, period: 7, atomicWeight: '247' },
    { symbol: 'Cf', name: 'Californium', atomicNumber: 98, category: 'actinide', group: 3, period: 7, atomicWeight: '251' },
    { symbol: 'Es', name: 'Einsteinium', atomicNumber: 99, category: 'actinide', group: 3, period: 7, atomicWeight: '252' },
    { symbol: 'Fm', name: 'Fermium', atomicNumber: 100, category: 'actinide', group: 3, period: 7, atomicWeight: '257' },
    { symbol: 'Md', name: 'Mendelevium', atomicNumber: 101, category: 'actinide', group: 3, period: 7, atomicWeight: '258' },
    { symbol: 'No', name: 'Nobelium', atomicNumber: 102, category: 'actinide', group: 3, period: 7, atomicWeight: '259' },
    { symbol: 'Lr', name: 'Lawrencium', atomicNumber: 103, category: 'actinide', group: 3, period: 7, atomicWeight: '266' },
    { symbol: 'Rf', name: 'Rutherfordium', atomicNumber: 104, category: 'transition', group: 4, period: 7, atomicWeight: '267' },
    { symbol: 'Db', name: 'Dubnium', atomicNumber: 105, category: 'transition', group: 5, period: 7, atomicWeight: '268' },
    { symbol: 'Sg', name: 'Seaborgium', atomicNumber: 106, category: 'transition', group: 6, period: 7, atomicWeight: '269' },
    { symbol: 'Bh', name: 'Bohrium', atomicNumber: 107, category: 'transition', group: 7, period: 7, atomicWeight: '270' },
    { symbol: 'Hs', name: 'Hassium', atomicNumber: 108, category: 'transition', group: 8, period: 7, atomicWeight: '277' },
    { symbol: 'Mt', name: 'Meitnerium', atomicNumber: 109, category: 'transition', group: 9, period: 7, atomicWeight: '278' },
    { symbol: 'Ds', name: 'Darmstadtium', atomicNumber: 110, category: 'transition', group: 10, period: 7, atomicWeight: '281' },
    { symbol: 'Rg', name: 'Roentgenium', atomicNumber: 111, category: 'transition', group: 11, period: 7, atomicWeight: '282' },
    { symbol: 'Cn', name: 'Copernicium', atomicNumber: 112, category: 'transition', group: 12, period: 7, atomicWeight: '285' },
    { symbol: 'Nh', name: 'Nihonium', atomicNumber: 113, category: 'post-transition', group: 13, period: 7, atomicWeight: '286' },
    { symbol: 'Fl', name: 'Flerovium', atomicNumber: 114, category: 'post-transition', group: 14, period: 7, atomicWeight: '289' },
    { symbol: 'Mc', name: 'Moscovium', atomicNumber: 115, category: 'post-transition', group: 15, period: 7, atomicWeight: '290' },
    { symbol: 'Lv', name: 'Livermorium', atomicNumber: 116, category: 'post-transition', group: 16, period: 7, atomicWeight: '293' },
    { symbol: 'Ts', name: 'Tennessine', atomicNumber: 117, category: 'halogen', group: 17, period: 7, atomicWeight: '294' },
    { symbol: 'Og', name: 'Oganesson', atomicNumber: 118, category: 'noble-gas', group: 18, period: 7, atomicWeight: '294' },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'nonmetal': 'bg-green-100 border-green-400',
      'noble-gas': 'bg-purple-100 border-purple-400',
      'alkali-metal': 'bg-red-100 border-red-400',
      'alkaline-earth': 'bg-orange-100 border-orange-400',
      'metalloid': 'bg-teal-100 border-teal-400',
      'halogen': 'bg-yellow-100 border-yellow-400',
      'post-transition': 'bg-blue-100 border-blue-400',
      'transition': 'bg-indigo-100 border-indigo-400',
      'lanthanide': 'bg-pink-100 border-pink-400',
      'actinide': 'bg-rose-100 border-rose-400',
    };
    return colors[category] || 'bg-gray-100 border-gray-400';
  };

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  // create a grid with placeholders for the periodic table layout
  const renderPeriodicTable = () => {
   
    const grid = Array(10).fill(null).map(() => Array(18).fill(null));

    elements.forEach(element => {
      const { period, group } = element;
      
      if (period <= 7 && !(period >= 6 && group === 3 && (element.category === 'lanthanide' || element.category === 'actinide'))) {
        grid[period - 1][group - 1] = element;
      }
      
      // lanthanides (period 8, shifted)
      if (period === 6 && element.category === 'lanthanide' && element.atomicNumber >= 58 && element.atomicNumber <= 71) {
        grid[8][element.atomicNumber - 58] = element;
      }
      
      // actinides (period 9, shifted)
      if (period === 7 && element.category === 'actinide' && element.atomicNumber >= 90 && element.atomicNumber <= 103) {
        grid[9][element.atomicNumber - 90] = element;
      }
    });

    return grid;
  };

  const periodicTableGrid = renderPeriodicTable();

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[1100px]">
          {/* main periodic table */}
          <div className="grid grid-cols-18 gap-1">
            {periodicTableGrid.slice(0, 7).map((row, rowIndex) => (
              <React.Fragment key={`row-${rowIndex}`}>
                {row.map((element, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} className="w-14 h-14">
                    {element && (
                      <div
                        className={`w-full h-full flex flex-col justify-center items-center border rounded cursor-pointer text-xs ${getCategoryColor(element.category)}`}
                        onClick={() => handleElementClick(element)}
                      >
                        <div className="text-[10px] text-black">{element.atomicNumber}</div>
                        <div className="text-sm font-bold text-black">{element.symbol}</div>
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          
          <div className="h-4"></div>
          
          {/* lanthanides */}
          <div className="grid grid-cols-15 gap-1 ml-[4.5rem]">
            {periodicTableGrid[8].slice(0, 15).map((element, colIndex) => (
              <div key={`lanthanide-${colIndex}`} className="w-14 h-14">
                {element && (
                  <div
                    className={`w-full h-full flex flex-col justify-center items-center border rounded cursor-pointer text-xs ${getCategoryColor(element.category)}`}
                    onClick={() => handleElementClick(element)}
                  >
                    <div className="text-[10px] text-black">{element.atomicNumber}</div>
                    <div className="text-sm font-bold text-black">{element.symbol}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Actinides */}
          <div className="grid grid-cols-15 gap-1 ml-[4.5rem] mt-1">
            {periodicTableGrid[9].slice(0, 15).map((element, colIndex) => (
              <div key={`actinide-${colIndex}`} className="w-14 h-14">
                {element && (
                  <div
                    className={`w-full h-full flex flex-col justify-center items-center border rounded cursor-pointer text-xs ${getCategoryColor(element.category)}`}
                    onClick={() => handleElementClick(element)}
                  >
                    <div className="text-[10px] text-black">{element.atomicNumber}</div>
                    <div className="text-sm font-bold text-black">{element.symbol}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedElement && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-xl font-bold text-black">{selectedElement.name} ({selectedElement.symbol})</h3>
          <div className="mt-2 grid grid-cols-2 gap-4 text-black">
            <div>
              <p><span className="font-medium">Atomic Number:</span> {selectedElement.atomicNumber}</p>
              <p><span className="font-medium">Atomic Weight:</span> {selectedElement.atomicWeight}</p>
              <p><span className="font-medium">Category:</span> {selectedElement.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            </div>
            <div>
              <p><span className="font-medium">Group:</span> {selectedElement.group}</p>
              <p><span className="font-medium">Period:</span> {selectedElement.period}</p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedElement(null)}
            className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-black transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-2">
        {Object.entries({
          'nonmetal': 'Non-metal',
          'noble-gas': 'Noble Gas',
          'alkali-metal': 'Alkali Metal',
          'alkaline-earth': 'Alkaline Earth',
          'metalloid': 'Metalloid',
          'halogen': 'Halogen',
          'post-transition': 'Post-Transition Metal',
          'transition': 'Transition Metal',
          'lanthanide': 'Lanthanide',
          'actinide': 'Actinide'
        }).map(([category, label]) => (
          <div key={category} className="flex items-center">
            <div className={`w-4 h-4 rounded mr-2 ${getCategoryColor(category)}`}></div>
            <span className="text-sm text-black">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


