import * as React from "react";

interface PdfListProps {}
interface PdfListState {}
// End of Types


export class PdfjsViewerComponent extends React.Component<PdfListProps, PdfListState> {
    constructor(props: PdfListProps) {
        super(props);
    }

    public render (): JSX.Element {
        return (
            <canvas id="theCanvas"></canvas>
        );
    }
}
