import { tDropDownOption } from '../../logics/general/types';
import DropDownMenu from '../general/DropDownMenu';
import DropDownSelector from '../general/DropDownSelector';

function PlayerListOrder() {
  const options = [
    { key: 'default', value: 'Home' },
    { key: 'player', value: 'Player' },
    { key: 'operator', value: 'Operator' },
  ];

  const action = (value: tDropDownOption['key']) => {
    switch (value) {
      case 'operator':
        break;
      case 'player':
        break;
      default:
    }
  };

  return (
    <DropDownMenu
      selected={<DropDownSelector selected={'Test'} />}
      classContainer="relative"
      classTrigger=""
      classList="left-0 w-[max-content] p-[1px]"
      classElement="transition-custom block cursor-pointer mt-[5px] p-[5px_10px] bg-[#fff] shadow-[inset_0_0_7px_0_#6393c4,0_0_0_1px_#6393c4] hover:shadow-[inset_0_0_7px_0_#ebad00,0_0_0_1px_#ebad00] text-[#2a4c6f] hover:text-[#705300] rounded-[3px]"
      options={options}
      action={action}
    />
  );
}

export default PlayerListOrder;
