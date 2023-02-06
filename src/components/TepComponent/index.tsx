import {ApiResponse} from '@models/ApiResponse';
import {actionLayThongTinFile, actionLayThongTinFileRef} from '@redux/actions/quanly';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import styles from './style';
import {File} from '@models/File';
import {showMessageWarning} from '@utils/index';
import {PDFIcon} from '@images/index';
import {TouchComponent} from '..';
import {PdfViewRoute, RootStackParamList} from '@navigations/NameRoute';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Icon from '@commons/Icon';

export interface Props {
	title?: string;
	fileUploads?: Array<string>;
	listInfoFileResponse?: ApiResponse<Array<File>>;
	listInfoFileRefResponse?: ApiResponse<Array<File>>;
	kyNhay?: boolean;
	kySo?: boolean;
	kySoRef?: boolean;
	kyNhayRef?: boolean;
	onPressKyNhay?: (id?: string) => void;
	onPressKySo?: (id?: string) => void;
	onPressKyNhayFileRef?: (id?: string) => void;
	onPressKySoFileRef?: (id?: string) => void;
	titleRef?: string;
	fileRef?: Array<string>;
	titleToTrinhRef?: string;
	fileToTrinhRef?: Array<string>;
}

const TepComponent = (props: Props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	const dispatch = useDispatch();
	const {
		title,
		fileUploads,
		listInfoFileResponse,
		titleRef,
		fileRef,
		listInfoFileRefResponse,
		titleToTrinhRef,
		fileToTrinhRef,
	} = props;
	const [listFile, setListFile] = useState<Array<File>>();
	const [listFileRef, setListFileRef] = useState<Array<File>>();

	useEffect(() => {
		dispatch(actionLayThongTinFile({listFile: fileUploads}));
	}, [fileUploads]);

	useEffect(() => {
		if (fileRef) {
			dispatch(actionLayThongTinFileRef({listFile: fileRef}));
		}
		if (fileToTrinhRef) {
			dispatch(actionLayThongTinFileRef({listFile: fileToTrinhRef}));
		}
	}, [fileRef, fileToTrinhRef]);

	useMemo(() => {
		if (!listInfoFileResponse) return;
		if (listInfoFileResponse.success) {
			setListFile(listInfoFileResponse.data);
		} else showMessageWarning(listInfoFileResponse.error);
	}, [listInfoFileResponse]);

	useMemo(() => {
		if (!listInfoFileRefResponse) return;
		if (listInfoFileRefResponse.success) {
			setListFileRef(listInfoFileRefResponse.data);
		} else showMessageWarning(listInfoFileRefResponse.error);
	}, [listInfoFileRefResponse]);

	function onViewPdf(item?: File) {
		navigation.push(PdfViewRoute, {fileId: item?.id});
	}
	//   kyNhay
	return (
		<View style={styles.tep}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.viewListFile}>
				{listFile?.map((file, index) => {
					return (
						<View key={index}>
							<TouchComponent style={styles.viewFile} onPress={() => onViewPdf(file)}>
								<View
									style={{
										flexDirection: 'row',
										paddingEnd: 8,
										alignItems: 'center',
									}}>
									<PDFIcon />
									<Text numberOfLines={2} style={styles.fileName}>
										{file?.fileName}
									</Text>
								</View>
								<View style={{flexDirection: 'row'}}>
									{props.kySo && file?.typeSign === 3 && (
										<TouchComponent
											style={{marginEnd: 8}}
											onPress={() => {
												if (props.onPressKySo) props.onPressKySo(file?.id);
											}}>
											<Icon name={'kynhay2'} size={25} color={'#0EACAF'} />
										</TouchComponent>
									)}
									{props.kyNhay && file?.typeSign === undefined && (
										<TouchComponent
											style={{marginEnd: 8}}
											onPress={() => {
												if (props.onPressKyNhay)
													props.onPressKyNhay(file?.id);
											}}>
											<Icon name={'trinh-ky1'} size={25} color={'#0EACAF'} />
										</TouchComponent>
									)}
								</View>
							</TouchComponent>
						</View>
					);
				})}
			</View>
			{fileRef && (
				<View>
					<Text style={[styles.title, {marginTop: 10}]}>{titleRef}</Text>
					<View style={styles.viewListFile}>
						{listFileRef?.map((file, index) => {
							return (
								<View key={index}>
									<TouchComponent
										style={styles.viewFile}
										onPress={() => onViewPdf(file)}>
										<View
											style={{
												flexDirection: 'row',
												paddingEnd: 8,
												alignItems: 'center',
											}}>
											<PDFIcon />
											<Text numberOfLines={2} style={styles.fileName}>
												{file?.fileName}
											</Text>
										</View>
										{/* {props.kyNhay && (
											<TouchComponent
												style={{marginEnd: 8}}
												onPress={() => {
													if (props.onPressKyNhayFileRef)
														props.onPressKyNhayFileRef();
												}}>
												<Icon
													name="trinh-ky1"
													size={25}
													color={'#0EACAF'}
												/>
											</TouchComponent>
										)} */}
										{props.kySoRef && file?.typeSign === 3 && (
											<TouchComponent
												style={{marginEnd: 8}}
												onPress={() => {
													if (props.onPressKySoFileRef)
														props.onPressKySoFileRef(file?.id);
												}}>
												<Icon
													name={'kynhay2'}
													size={25}
													color={'#0EACAF'}
												/>
											</TouchComponent>
										)}
										{props.kyNhayRef && file?.typeSign === undefined && (
											<TouchComponent
												style={{marginEnd: 8}}
												onPress={() => {
													if (props.onPressKyNhayFileRef)
														props.onPressKyNhayFileRef(file?.id);
												}}>
												<Icon
													name={'trinh-ky1'}
													size={25}
													color={'#0EACAF'}
												/>
											</TouchComponent>
										)}
									</TouchComponent>
								</View>
							);
						})}
					</View>
				</View>
			)}
			{fileToTrinhRef && (
				<View>
					<Text style={[styles.title, {marginTop: 10}]}>{titleToTrinhRef}</Text>
					<View style={styles.viewListFile}>
						{listFileRef?.map((file, index) => {
							return (
								<View key={index}>
									<TouchComponent
										style={styles.viewFile}
										onPress={() => onViewPdf(file)}>
										<View
											style={{
												flexDirection: 'row',
												paddingEnd: 8,
												alignItems: 'center',
											}}>
											<PDFIcon />
											<Text numberOfLines={2} style={styles.fileName}>
												{file?.fileName}
											</Text>
										</View>
										{/* {props.kyNhay && (
											<TouchComponent
												style={{marginEnd: 8}}
												onPress={() => {
													if (props.onPressKyNhayFileRef)
														props.onPressKyNhayFileRef();
												}}>
												<Icon
													name="trinh-ky1"
													size={25}
													color={'#0EACAF'}
												/>
											</TouchComponent>
										)} */}
										{props.kySoRef && file?.typeSign === 3 && (
											<TouchComponent
												style={{marginEnd: 8}}
												onPress={() => {
													if (props.onPressKySoFileRef)
														props.onPressKySoFileRef(file?.id);
												}}>
												<Icon
													name={'kynhay2'}
													size={25}
													color={'#0EACAF'}
												/>
											</TouchComponent>
										)}
										{props.kyNhayRef && file?.typeSign === undefined && (
											<TouchComponent
												style={{marginEnd: 8}}
												onPress={() => {
													if (props.onPressKyNhayFileRef)
														props.onPressKyNhayFileRef(file?.id);
												}}>
												<Icon
													name={'trinh-ky1'}
													size={25}
													color={'#0EACAF'}
												/>
											</TouchComponent>
										)}
									</TouchComponent>
								</View>
							);
						})}
					</View>
				</View>
			)}
		</View>
	);
};

TepComponent.defaultProps = {};

const mapStateToProps = (state: any) => {
	return {
		listInfoFileResponse: state.quanly.listInfoFileResponse,
		listInfoFileRefResponse: state.quanly.listInfoFileRefResponse,
	};
};

export default connect(mapStateToProps)(memo(TepComponent));

// {
//     "DV": true,
//     "TCDT": false,
//     "BTC": false
//   }

// {
//     "DV": false,
//     "TCDT": false,
//     "BTC": false
//   }
