import { useState } from 'react';
import NewProperty from '../pages/NewProperty';
import NewPropertyPhotos from '../pages/NewPropertyPhotos';
import NewPropertyPreview from './NewPropertyPreview';

function PublishProperty() {
  const [step, setStep] = useState(1);
  const [propertyData, setPropertyData] = useState(null);

  if (step === 1) {
    return (
      <NewProperty
        onSubmit={(data) => {
          setPropertyData(data);
          setStep(2);
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <NewPropertyPhotos
        onBack={() => setStep(1)}
        onSubmit={(photos) => {
          setPropertyData((prev) => ({
            ...prev,
            photos
          }));
          setStep(3); // 👉 ACA VAS AL PREVIEW
        }}
      />
    );
  }

  if (step === 3) {
    return (
      <NewPropertyPreview
        photos={propertyData.photos}
        onBack={() => setStep(2)}
      />
    );
  }

  return null;
}

export default PublishProperty;