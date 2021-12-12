import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Checkbox, Subheading } from "react-native-paper";
import { useStores } from "../../models";
import { color, spacing } from "../../theme";

export const ActivityItem = (props) => {
    const { formActivitiesStore } = useStores();
    const [loading, setLoading] = useState(false);
    const { data } = props;
    const isActive = data.activityResult == '1';

    const update = async () => {
        setLoading(true);
        let collection = JSON.parse(JSON.stringify(data));
        collection.id_aktivitas = formActivitiesStore.formactivity.id;
        collection.activityResult = isActive ? '0' : '1';
        await formActivitiesStore.updateActivityItem(collection);
        setLoading(false);
    }

    return (
        <TouchableOpacity onPress={() => update()}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: isActive ? color.palette.primary : color.palette.bgForms,
                marginTop: spacing[3],
                borderRadius: spacing[3],
                padding: spacing[1],
                paddingHorizontal: spacing[4],
                borderWidth: 0.5,
                borderColor: "#A7B0C0",
            }}>
                {loading ?
                    <ActivityIndicator color={isActive ? 'white' : color.palette.primary} style={{ margin: 6 }} />
                    :
                    <Checkbox
                        color={color.palette.white}
                        status={isActive ? 'checked' : 'unchecked'}
                    />
                }
                <Subheading style={{ marginLeft: spacing[2], color: isActive ? color.palette.white : color.palette.primary }}>{data.jenis_aktivitas.name}</Subheading>
            </View>
        </TouchableOpacity>
    )
}