import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

export const useSelectImage = (): [
  string | null,
  (callback?: (imageUrl: string) => void) => void
] => {
  const [image, setImage] = useState<string>(null);

  const onSelectImage = async (
    callback?: (imageUrl: string) => void
  ): Promise<void> => {
    // No permissions request is necessary for launching the image library
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      if (callback) callback(result.uri);
    }
  };

  return [image, onSelectImage];
};
