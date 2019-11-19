import React, { useState, useContext } from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { TextInput } from '../../index';
import { ThemeContext } from '../../../theme';
import { translate } from '../../../i18n';

const ModalSelect = ({
  /**
   * Possible option to choose from,
   * NOTE: don't add heading or dummy item in begining
   */
  data,
  /**
   * Disable the picker
   */
  disabled,
  /**
   * Initial placeholder string shown,
   * when no option is selected
   */
  label,
  /**
   * Text to append along with the label,
   * when item is selected
   */
  attribute,
  /**
   * Function to get called when item is selected
   */
  onChange,
  /**
   * Container style
   */
  style,
  /**
   * Text style
   */
  textStyle,
  /**
   * Color for placeholder Text and drop down icon
   */
  placeholderTextColor
}) => {
  const [value, setValue] = useState('');
  const theme = useContext(ThemeContext);
  const dataWithLabel = [
    {
      key: '5d80812e', // Random key
      section: true,
      label,
    },
    ...data
  ];

  const _onChange = (option) => {
    if (attribute) {
      setValue(`${attribute}: ${option.label}`);
    } else {
      setValue(`${option.label}`);
    }
    if (onChange) {
      onChange(option.key, option);
    }
  };

  return (
    <ModalSelector
      accessible
      disabled={disabled}
      data={dataWithLabel}
      onChange={_onChange}
      keyExtractor={item => item.id}
      scrollViewAccessibilityLabel={translate('modalSelect.scroll')}
      cancelButtonAccessibilityLabel={translate('modalSelect.cancelButton')}
    >
      <TextInput
        inputContainerStyle={StyleSheet.flatten([
          styles.customInputContainer(theme),
          style,
          disabled && styles.disabledContainer
        ])}
        inputStyle={StyleSheet.flatten([styles.inputStyle, textStyle])}
        editable={false}
        placeholder={label}
        value={value}
        placeholderTextColor={placeholderTextColor}
        rightIcon={
          <Icon name="arrow-drop-down" size={30} color={placeholderTextColor || theme.colors.label} />
        }
      />
    </ModalSelector>
  );
};

// TODO: add style for disabled element
const styles = {
  inputStyle: {
    textAlign: 'center',
  },
  customInputContainer: theme => ({
    borderWidth: 1,
    borderRadius: theme.dimens.borderRadius,
  }),
  disabledContainer: {
    opacity: 0.5
  }
};

ModalSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
  attribute: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  style: ViewPropTypes.style,
  textStyle: PropTypes.object,
  placeholderTextColor: PropTypes.string,
};

ModalSelect.defaultProps = {
  disabled: false,
  onChange: () => { },
  attribute: '',
  style: {},
  textStyle: {},
  placeholderTextColor: '',
};

export default ModalSelect;