import AppColors from '@commons/AppColors';
import Icon from '@commons/Icon';
import {ButtonComponent, TouchComponent, Divide} from '@components/index';
import {CloseIcon} from '@images/index';
import React, {memo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import TreeView from 'react-native-final-tree-view';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import styles from './style';

export interface Props {
	data?: any;
	listSelect?: Array<any>;
	isVisible?: boolean;
	onSelect: (item: any) => void;
	// onSelectHT: (item: Leader, processType?: String) => void
	// onSelectHXL: (item: Leader, hanXuly: any) => void
	// onSelectND: (item: Leader, noiDung: string) => void
	onSelectAccept: () => void;
	closePopup: () => void;
}

const ModalTrinhComponent = (props: Props) => {
	const {data, isVisible, listSelect, onSelect, onSelectAccept, closePopup} = props;
	const listHT = [
		{
			value: 1,
			label: 'Chủ trì',
		},
		{
			value: 2,
			label: 'Phối hợp',
		},
		{
			value: 3,
			label: 'Thông báo',
		},
	];

	function getIndicator(isExpanded: any, hasChildrenNodes: any) {
		if (!hasChildrenNodes) {
			return '';
		} else if (isExpanded) {
			return '\\/';
		} else {
			return '>';
		}
	}

	function isSelect(node: any) {
		const isExist = listSelect?.find(donvi => donvi.id === node.id);
		return isExist ? true : false;
	}

	function onTreeItem(node: any) {
		if (!node.children) onSelect(node);
	}

	// const renderItem = (item: Leader, index: number) => (
	//   <View style={item.isSelect ? { backgroundColor: '#FAFAFA' } : { backgroundColor: 'white' }}>
	//     <TouchComponent style={styles.viewLeader} onPress={() => onSelect(item)}>
	//       <View style={styles.viewIcon}>
	//         <FastImage
	//           style={styles.avatarImg}
	//           source={{ uri: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/ED32/production/_122722706_oliverderbidgepicnca.png' }}
	//           resizeMode={FastImage.resizeMode.cover} />
	//       </View>
	//       <View style={styles.viewInfo}>
	//         <Text style={styles.viewInfoName}>{item.fullName}</Text>
	//         <Text style={styles.viewInfoPosition}>{item.positionName}</Text>
	//       </View>
	//       <View style={styles.viewSelect}>
	//         {
	//           item.isSelect ? <ItemSelectActiveIcon /> : <ItemSelectNomalIcon />
	//         }
	//       </View>
	//     </TouchComponent>
	//     {
	//       item.isSelect && <View>
	//         <SelectComponent title='Hình thức' data={listHT} onSelectChange={(value) => onSelectHT(item, value)} />
	//         <SelectDateComponent title='Hạn xử lý' value={item.hanXuLy} onChange={(date) => onSelectHXL(item, date)} />
	//         <InputComponent title='Nội dung xử lý' value={item.noiDung} multiline={true} numberOfLines={3} onChange={(text) => onSelectND(item, text)} />
	//       </View>
	//     }
	//   </View>
	// );

	return (
		<View>
			<Modal
				isVisible={isVisible}
				onBackdropPress={closePopup}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				useNativeDriver
				hideModalContentWhileAnimating
				style={styles.modal}>
				<View style={styles.container}>
					<View style={styles.viewTitle}>
						<Text style={styles.textTitle}>Danh sách lãnh đạo</Text>
						<TouchComponent style={styles.close} onPress={closePopup}>
							<CloseIcon />
						</TouchComponent>
					</View>
					<View style={styles.viewList}>
						<ScrollView showsVerticalScrollIndicator={false}>
							<TreeView
								data={data} // defined above
								onNodePress={({node, level}) => onTreeItem(node)}
								renderNode={({node, level, isExpanded, hasChildrenNodes}) => {
									return (
										<View>
											<View
												style={{
													flexDirection: 'row',
													paddingVertical: 6,
													alignContent: 'center',
													alignItems: 'center',
												}}>
												{!node.children && (
													<>
														{isSelect(node) && (
															<Icon
																name="checkbox-checked"
																color={AppColors.iconColor}
																size={12}
															/>
														)}
														{!isSelect(node) && (
															<Icon
																name="checkbox-unchecked"
																color={AppColors.iconColor}
																size={12}
															/>
														)}
													</>
												)}

												<Text
													style={{
														marginLeft: 15 * level,
													}}>
													{getIndicator(isExpanded, hasChildrenNodes)}{' '}
													{node.name}
												</Text>
											</View>
											<Divide />
										</View>
									);
								}}
							/>
						</ScrollView>
					</View>
					<View style={styles.viewButton}>
						<ButtonComponent title="Chọn" onPress={onSelectAccept} />
						<ButtonComponent title="Đóng" onPress={closePopup} />
					</View>
				</View>
			</Modal>
		</View>
	);
};

ModalTrinhComponent.defaultProps = {
	isVisible: false,
	onlyFilePublic: false,
};

const mapStateToProps = (state: any) => {
	return {
		listFileResponse: state.quanly.listFileResponse,
	};
};

export default connect(mapStateToProps)(memo(ModalTrinhComponent));
