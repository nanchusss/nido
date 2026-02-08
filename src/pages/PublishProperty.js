import { useState } from 'react';
import NewProperty from '../pages/NewProperty';
import NewPropertyPhotos from '../pages/NewPropertyPhotos';
import NewPropertyPreview from './NewPropertyPreview';
import NewPropertyFinalPreview from './NewPropertyFinalPreview';

function PublishProperty() {
  const [step, setStep] = useState(1);
  const [propertyData, setPropertyData] = useState({});

  switch (step) {
    case 1:
      return (
        <NewProperty
          onSubmit={(data) => {
            setPropertyData(data);
            setStep(2);
          }}
        />
      );

    case 2:
      return (
        <NewPropertyPhotos
          onBack={() => setStep(1)}
          onSubmit={(photos) => {
            setPropertyData((prev) => ({
              ...prev,
              photos,
            }));
            setStep(3);
          }}
        />
      );

    case 3:
      return (
        <NewPropertyPreview
          photos={propertyData.photos || []}
          onBack={() => setStep(2)}
          onNext={(previewData) => {
            setPropertyData((prev) => ({
              ...prev,
              preview: previewData,
            }));
            setStep(4);
          }}
        />
      );

    case 4:
      return (
        <NewPropertyFinalPreview
          propertyData={propertyData}
          onBack={() => setStep(3)}
          onPublish={() => {
            console.log('Publicar propiedad', propertyData);
          }}
        />
      );

    default:
      return null;
  }
}

export default PublishProperty;