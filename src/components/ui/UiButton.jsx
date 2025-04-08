const UiButton = (props) => {
  const {
    label,
    onClick,
    variant = 'primary',
    size = 'medium',
    className = '',
    disabled = false,
    ...rest
  } = props;

  // 버튼 스타일 클래스 계산
  const getButtonClasses = () => {
    // 기본 클래스
    let classes =
      'font-medium rounded-lg shadow-md transition duration-300 text-center cursor-pointer ';

    // 크기별 클래스
    if (size === 'small') {
      classes += 'px-4 py-2 text-sm ';
    } else if (size === 'medium') {
      classes += 'px-6 py-3 ';
    } else if (size === 'large') {
      classes += 'px-8 py-4 text-lg ';
    }

    // 변형별 클래스
    if (variant === 'primary') {
      classes += 'bg-blue-600 text-white hover:bg-blue-700 ';
    } else if (variant === 'secondary') {
      classes +=
        'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 ';
    } else if (variant === 'outline') {
      classes +=
        'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 ';
    }

    // 비활성화 상태 클래스
    if (disabled) {
      classes += 'opacity-50 cursor-not-allowed ';
    }

    // 사용자 지정 클래스 추가
    return `${classes} ${className}`;
  };

  return (
    <button {...rest} className={getButtonClasses()} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// default props
UiButton.defaultProps = {
  label: 'Button',
  onClick: () => {},
  variant: 'primary',
  size: 'medium',
  className: '',
  disabled: false,
};

export default UiButton;
