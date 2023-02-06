import React, {memo, useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';
import {SettingIcon, MenuTrinhIcon} from '@images/index';
import {TouchComponent} from '@components/index';

export interface Props {
	isTrinh?: boolean;
	isDuyet?: boolean;
	isTra?: boolean;
	isChuyenBS?: boolean;
	onTrinhPress?: () => void;
	onDuyetPress?: () => void;
	onTraPress?: () => void;
	onChuyenBSPress?: () => void;
}

const MenuHDComponent = (props: Props) => {
	const platform = Platform.OS;
	const {
		isTrinh,
		isDuyet,
		isTra,
		isChuyenBS,
		onTrinhPress,
		onDuyetPress,
		onTraPress,
		onChuyenBSPress,
	} = props;
	const [visible, setVisible] = useState(false);

	const hideMenu = () => setVisible(false);

	const showMenu = () => setVisible(true);

	const listMenu = [
		{
			title: 'Trình',
			code: 'trinh',
			icon: MenuTrinhIcon,
			isShow: isTrinh,
			onAction: _onTrinhPress,
		},
		{
			title: 'Duyệt',
			code: 'duyet',
			icon: MenuTrinhIcon,
			isShow: isDuyet,
			onAction: _onDuyetPress,
		},
		{
			title: 'Chuyển trả',
			code: 'chuyentra',
			icon: MenuTrinhIcon,
			isShow: isTra,
			onAction: _onTraPress,
		},
		{
			title: 'Chuyển bổ sung',
			code: 'chuyenbosung',
			icon: MenuTrinhIcon,
			isShow: isChuyenBS,
			onAction: _onChuyenBSPress,
		},
	].filter(item => item.isShow);

	function _onTrinhPress() {
		setVisible(false);
		if (onTrinhPress) onTrinhPress();
	}

	function _onDuyetPress() {
		setVisible(false);
		if (onDuyetPress) onDuyetPress();
	}

	function _onTraPress() {
		setVisible(false);
		if (onTraPress) onTraPress();
	}

	function _onChuyenBSPress() {
		setVisible(false);
		if (onChuyenBSPress) onChuyenBSPress();
	}

	return (
		<>
			{listMenu.length > 0 && (
				<Menu
					visible={visible}
					anchor={
						<TouchComponent onPress={showMenu}>
							<SettingIcon />
						</TouchComponent>
					}
					onRequestClose={hideMenu}>
					{listMenu.map((item, index) => {
						return (
							<MenuItem
								key={index}
								onPress={item.onAction}
								children={
									<View
										style={{
											width: 130,
											flexDirection: 'row',
											alignContent: 'center',
											alignItems: 'center',
										}}>
										<Text style={platform === 'ios' ? {marginLeft: 12} : {}}>
											{item.title}
										</Text>
										<View
											style={{
												position: 'absolute',
												right: platform === 'ios' ? -20 : 0,
											}}>
											<item.icon />
										</View>
									</View>
								}
							/>
						);
					})}
				</Menu>
			)}
		</>
	);
};

MenuHDComponent.defaultProps = {
	isTrinh: true,
	isDuyet: true,
	isTra: true,
	isChuyenBS: true,
};

export default memo(MenuHDComponent);
