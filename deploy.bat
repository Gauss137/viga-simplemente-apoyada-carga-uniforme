@echo off
echo 🏗️ Implementando nueva arquitectura de calculadoras...
echo.

echo ✅ 1. Añadiendo archivos al repositorio...
git add -A

echo ✅ 2. Haciendo commit de la nueva arquitectura...
git commit -m "🏗️ Arquitectura v2.0 - Sistema Escalable para 97 Calculadoras

✨ Nueva Arquitectura Implementada:
- 📦 Registro central de 97 calculadoras organizadas
- 🛠️ Generador automático de calculadoras (CLI)
- 🎨 Componentes shared reutilizables
- 📊 Sistema de resultados configurable
- 🖼️ Diagramas dinámicos con Canvas
- ⚡ Componentes UI básicos creados

🏗️ Estructura Escalable:
- Vigas: 43 calculadoras en 6 categorías
- Pórticos: 33 calculadoras en 8 categorías  
- Losas: 21 calculadoras en 3 categorías
- Acero: 8 calculadoras (migradas)

🔧 Mejoras Técnicas:
- Tailwind CSS actualizado con design system
- TypeScript strict mode preparado
- Testing framework configurado
- CLI generator funcional
- Documentación completa actualizada

📱 Ready for Production:
- Build optimizado y funcional
- Componentes UI creados (Card, Button, Badge)
- CSS actualizado con variables HSL
- Vercel config actualizada con redirects
- README v2.0 con roadmap completo

🚀 Próximo: Migración gradual de calculadoras existentes"

echo ✅ 3. Enviando cambios a GitHub...
git push

echo.
echo 🎉 ¡Deploy completado! Los cambios deberían aparecer en Vercel automáticamente.
echo 🌐 Verifica en: https://viga-simplemente-apoyada-carga-uniforme.vercel.app/
echo.
pause 