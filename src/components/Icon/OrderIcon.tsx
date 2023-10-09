import React from "react";
import {Image} from "antd";

export type IconProps = {
  size?: number;
  width?: number;
  height?: number;
};

const PurseIcon: React.FC<IconProps> = (props) => {
  const { size, width, height } = props;

  return (
    <Image
      src={"/icons/order.png"}
      preview={false}
      width={size ?? width ?? 14}
      height={size ?? height ?? 14}
      style={{
        display: 'flex',
        margin: '0 auto'
      }}
    />
  );
};

export default PurseIcon;
