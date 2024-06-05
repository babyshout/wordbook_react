import * as React from "react";

function useOpenState() {
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    };

    return [open, setOpen, toggleOpen];
}

export default useOpenState;