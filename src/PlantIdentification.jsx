export default function PlantIdentification() {
  return (
    <div className="plant-id-page">
      <h1>Plant Identification</h1>
      <p>Identify plants and crops from photos</p>
      <div className="upload-area">
        <input type="file" accept="image/*" />
        <button className="btn-primary">Identify Plant</button>
      </div>
    </div>
  )
}
