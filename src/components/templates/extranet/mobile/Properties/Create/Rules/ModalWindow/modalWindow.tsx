import { PropertyRulesWithCache } from '@/components/Property/PropertyRules/propertyRulesWithCache'
import { BottomSheet } from "react-spring-bottom-sheet";

export const ModalWindow: React.FC<any> = (props) => {
    return (
        <BottomSheet
            open={props.open}
            onDismiss={() => props.handleClose()}
            blocking={false}
            snapPoints={({maxHeight }) => [
                maxHeight - 80,
            ]}
        >
                {props.open && (
                    <div style={{ paddingBottom: '56px' }}>
                        <PropertyRulesWithCache />
                    </div>
                )}
        </BottomSheet>
    );
}