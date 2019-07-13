import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import CalculateSkillNodes from '../CalculateNodeCount';
import { Skill } from 'models';
import SkillTreeGroupContext from '../../context/SkillTreeGroupContext';
import {
  legsPullData,
  legsPushData,
} from '../../components/__mocks__/mockData';

interface GetDummyCounterProps {
  children: (totalCount: number) => JSX.Element;
}

function GetDummyCounter({ children }: GetDummyCounterProps) {
  const { totalCount } = useContext(SkillTreeGroupContext);

  return children(totalCount);
}

function renderComponent(data: Skill[]) {
  let counter = 0;

  function getCounter() {
    return counter;
  }

  const api = render(
    <GetDummyCounter>
      {totalCount => {
        counter = totalCount;
        return <CalculateSkillNodes data={data} />;
      }}
    </GetDummyCounter>
  );

  return {
    ...api,
    getCounter: getCounter(),
  };
}

describe('CalculateSkillNodes component', () => {
  it('should let the counter remain at 0 when no data is passed through', () => {
    const { getCounter } = renderComponent([]);

    expect(getCounter).toBe(0);
  });

  xit('should correctly calculate a single branch tree', async () => {
    const { getCounter, debug } = renderComponent(legsPullData);
    debug();

    expect(getCounter).toBe(6);
  });

  xit('should correctly calculate a tree with multiples branches', () => {
    const { getCounter } = renderComponent(legsPushData);

    expect(getCounter).toBe(6);
  });
});