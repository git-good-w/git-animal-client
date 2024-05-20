import React, { useState } from 'react';

import type { PetInfoSchema } from '@/schema/user';

import PetList from './PetList';
import ShopRow from './SellInputRow';

function SellSection() {
  const [selectPersona, setSelectPersona] = useState<PetInfoSchema>();
  return (
    <div>
      <ShopRow item={selectPersona} />
      <h3>Pets</h3>
      <PetList onProductClick={setSelectPersona} />
    </div>
  );
}

export default SellSection;
