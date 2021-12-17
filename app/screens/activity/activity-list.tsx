import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Checkbox, Divider, Paragraph, Subheading, Text } from "react-native-paper";
import { useStores } from "../../models";
import { color, spacing } from "../../theme";

export const ActivityItem = (props) => {
    const { formActivitiesStore } = useStores();
    const [loading, setLoading] = useState(false);
    const { data } = props;
    console.log(JSON.stringify(data))
    const isActive = data.activityResult == '1';

    const update = async (actResult) => {
        setLoading(true);
        let collection = JSON.parse(JSON.stringify(data));
        collection.id_aktivitas = formActivitiesStore.formactivity.id;
        collection.activityResult = actResult;
        await formActivitiesStore.updateActivityItem(collection);
        setLoading(false);
    }

    return (
        <>
            {data.jenis_aktivitas?.activityInput == "boolean" ?
                <TouchableOpacity onPress={() => update(isActive ? '0' : '1')}>
                    <View style={[
                        styles.btnInput,
                        {
                            backgroundColor: isActive ? color.palette.primary : color.palette.bgForms,
                        }
                    ]}>
                        {loading ?
                            <ActivityIndicator color={isActive ? 'white' : color.palette.primary} style={{ margin: 6 }} />
                            :
                            <Checkbox
                                color={color.palette.white}
                                status={isActive ? 'checked' : 'unchecked'}
                            />
                        }
                        <Subheading style={{ marginLeft: spacing[2], color: isActive ? color.palette.white : color.palette.primary }}>{data.jenis_aktivitas?.name}</Subheading>
                    </View>
                </TouchableOpacity>
                :
                data.jenis_aktivitas?.activityInput == "option" ?
                    <View style={{
                        marginTop: spacing[3],
                    }}>
                        <Subheading style={{marginTop: spacing[2]}}>{data.jenis_aktivitas?.name}</Subheading>
                        <Divider />
                        {data.jenis_aktivitas?.options.map(opt => {
                            let isSelected = data.activityResult == opt.value;
                            return (
                                <TouchableOpacity key={Math.random()} onPress={() => update(opt.value)}>
                                    <View style={[
                                        styles.btnInput,
                                        {
                                            backgroundColor: isSelected ? color.palette.primary : color.palette.bgForms,
                                        }
                                    ]}>
                                        {loading ?
                                            <ActivityIndicator color={isSelected ? 'white' : color.palette.primary} style={{ margin: 6 }} />
                                            :
                                            <Checkbox
                                                color={color.palette.white}
                                                status={isSelected ? 'checked' : 'unchecked'}
                                            />
                                        }
                                        <Subheading style={{ marginLeft: spacing[2], color: isSelected ? color.palette.white : color.palette.primary }}>{opt.name}</Subheading>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    :
                    <Paragraph style={{ color: 'red', marginTop: spacing[3], fontStyle: 'italic' }}>{`Aktivitas ${data.jenis_aktivitas?.name} belum didukung!`}</Paragraph>
            }
        </>
    )
}

const styles = StyleSheet.create({
    btnInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing[3],
        borderRadius: spacing[3],
        padding: spacing[1],
        paddingHorizontal: spacing[4],
        borderWidth: 0.5,
        borderColor: "#A7B0C0",
    }
});