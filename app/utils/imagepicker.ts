import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CameraOptions, ImageLibraryOptions, Callback, ImagePickerResponse } from './imagepicker.props';

const DEFAULT_OPTIONS: ImageLibraryOptions & CameraOptions = {
    mediaType: 'photo',
    videoQuality: 'high',
    quality: 1,
    includeBase64: false,
    cameraType: 'back',
    selectionLimit: 1,
    saveToPhotos: false,
};

export function onlaunchCamera(callback?: Callback): Promise<ImagePickerResponse> {
    return new Promise(resolve => {
        launchCamera(
            { ...DEFAULT_OPTIONS },
            (result: ImagePickerResponse) => {
                if (callback) callback(result);
                resolve(result);
            },
        );
    });
}

export function onlaunchImageLibrary(callback?: Callback): Promise<ImagePickerResponse> {
    return new Promise(resolve => {
        launchImageLibrary(
            { ...DEFAULT_OPTIONS },
            (result: ImagePickerResponse) => {
                if (callback) callback(result);
                resolve(result);
            },
        );
    })
}